// Main JavaScript file for Apotek Sehat website

// Product data structure
const products = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        category: "Obat Demam",
        description: "Obat penurun demam dan pereda nyeri untuk dewasa dan anak-anak",
        price: 15000,
        image: "https://via.placeholder.com/300x300/2563eb/ffffff?text=Paracetamol"
    },
    {
        id: 2,
        name: "Amoxicillin 500mg",
        category: "Antibiotik",
        description: "Antibiotik untuk infeksi bakteri, harus dengan resep dokter",
        price: 45000,
        image: "https://via.placeholder.com/300x300/10b981/ffffff?text=Amoxicillin"
    },
    {
        id: 3,
        name: "Vitamin C 1000mg",
        category: "Suplemen",
        description: "Suplemen vitamin C untuk meningkatkan daya tahan tubuh",
        price: 35000,
        image: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Vitamin+C"
    },
    {
        id: 4,
        name: "Antasida Tablet",
        category: "Obat Maag",
        description: "Meredakan gejala maag, perut kembung, dan nyeri lambung",
        price: 20000,
        image: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Antasida"
    },
    {
        id: 5,
        name: "Obat Batuk Sirup",
        category: "Obat Batuk",
        description: "Meredakan batuk berdahak dan tidak berdahak untuk segala usia",
        price: 28000,
        image: "https://via.placeholder.com/300x300/ec4899/ffffff?text=Obat+Batuk"
    },
    {
        id: 6,
        name: "Salep Luka",
        category: "Obat Luar",
        description: "Salep antibiotik untuk luka ringan, lecet, dan luka bakar ringan",
        price: 18000,
        image: "https://via.placeholder.com/300x300/06b6d4/ffffff?text=Salep+Luka"
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Falhan Jaya Medica website loaded successfully');
    
    // Initialize navigation functionality
    initNavigation();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize CTA button functionality
    initCTAButton();
    
    // Render product cards
    renderProducts();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize service modal
    initServiceModal();
});

/**
 * Initialize navigation functionality
 * - Smooth scroll to sections
 * - Active section detection on scroll
 * - Navbar background change on scroll
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scroll to sections when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section detection on scroll
    window.addEventListener('scroll', function() {
        // Add scrolled class to navbar for styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Detect active section
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

/**
 * Initialize mobile menu toggle functionality
 * - Toggle hamburger menu on click
 * - Close menu when navigation link is clicked
 * - Update aria-expanded for accessibility
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        hamburger.setAttribute('aria-expanded', isActive);
    });
    
    // Close mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}


/**
 * Initialize CTA button functionality
 * - Scroll to products section when clicked
 * - Use smooth scroll behavior
 */
function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    const navbar = document.getElementById('navbar');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const productsSection = document.querySelector('#products');
            
            if (productsSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = productsSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}


/**
 * Render product cards dynamically
 * - Loop through products array
 * - Generate HTML for each product card
 * - Insert cards into products container
 */
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) {
        console.error('Products grid container not found');
        return;
    }
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Loop through products array and generate HTML for each product
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

/**
 * Create a product card element
 * @param {Object} product - Product data object
 * @returns {HTMLElement} - Product card element
 */
function createProductCard(product) {
    // Create product card container
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0'); // Keyboard navigation support
    
    // Create product image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image';
    
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'lazy'; // Add lazy loading for images below fold
    
    // Add error handler for image loading failures
    img.onerror = function() {
        // Display placeholder image on load failure
        this.src = 'https://via.placeholder.com/300x300/e5e7eb/6b7280?text=Produk+Apotek';
        this.alt = 'Placeholder image';
    };
    
    imageContainer.appendChild(img);
    
    // Create product info container
    const infoContainer = document.createElement('div');
    infoContainer.className = 'product-info';
    
    // Product category
    const category = document.createElement('span');
    category.className = 'product-category';
    category.textContent = product.category;
    
    // Product name
    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = product.name;
    
    // Product description
    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = product.description;
    
    // Product footer (price and button)
    const footer = document.createElement('div');
    footer.className = 'product-footer';
    
    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = `Rp ${product.price.toLocaleString('id-ID')}`;
    price.setAttribute('aria-label', `Price: ${product.price.toLocaleString('id-ID')} Rupiah`);
    
    const button = document.createElement('button');
    button.className = 'product-btn';
    button.textContent = 'Info';
    button.setAttribute('aria-label', `More information about ${product.name}`);
    
    footer.appendChild(price);
    footer.appendChild(button);
    
    // Assemble product info
    infoContainer.appendChild(category);
    infoContainer.appendChild(name);
    infoContainer.appendChild(description);
    infoContainer.appendChild(footer);
    
    // Assemble product card
    card.appendChild(imageContainer);
    card.appendChild(infoContainer);
    
    return card;
}


/**
 * Form Validation Functions
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email format is valid
 */
function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone format is valid
 */
function validatePhone(phone) {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    // Indonesian phone numbers typically have 10-13 digits
    // Accept formats like: 081234567890, +6281234567890, 021-12345678
    return cleanPhone.length >= 10 && cleanPhone.length <= 13;
}

/**
 * Validate if field is empty
 * @param {string} value - Field value to validate
 * @returns {boolean} - True if field is empty or only whitespace
 */
function isFieldEmpty(value) {
    return !value || value.trim() === '';
}

/**
 * Display error message for a form field
 * @param {HTMLElement} field - Input field element
 * @param {string} message - Error message to display
 */
function showError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    errorElement.textContent = message;
    field.style.borderColor = '#ef4444';
}

/**
 * Clear error message for a form field
 * @param {HTMLElement} field - Input field element
 */
function clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    errorElement.textContent = '';
    field.style.borderColor = '';
}


/**
 * Initialize contact form functionality
 * - Add submit event listener
 * - Validate all fields on submission
 * - Display error messages for invalid fields
 * - Display success message on valid submission
 * - Clear form fields after successful submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        return;
    }
    
    // Add submit event listener
    contactForm.addEventListener('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const messageField = document.getElementById('message');
        
        // Clear all previous errors
        clearError(nameField);
        clearError(emailField);
        clearError(phoneField);
        clearError(messageField);
        
        let isValid = true;
        
        // Validate name field
        if (isFieldEmpty(nameField.value)) {
            showError(nameField, 'Field ini wajib diisi');
            isValid = false;
        }
        
        // Validate email field
        if (isFieldEmpty(emailField.value)) {
            showError(emailField, 'Field ini wajib diisi');
            isValid = false;
        } else if (!validateEmail(emailField.value)) {
            showError(emailField, 'Format email tidak valid');
            isValid = false;
        }
        
        // Validate phone field
        if (isFieldEmpty(phoneField.value)) {
            showError(phoneField, 'Field ini wajib diisi');
            isValid = false;
        } else if (!validatePhone(phoneField.value)) {
            showError(phoneField, 'Nomor telepon tidak valid');
            isValid = false;
        }
        
        // Validate message field
        if (isFieldEmpty(messageField.value)) {
            showError(messageField, 'Field ini wajib diisi');
            isValid = false;
        }
        
        // If all fields are valid, send to WhatsApp
        if (isValid) {
            // Get form values
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const phone = phoneField.value.trim();
            const message = messageField.value.trim();
            
            // Create WhatsApp message with all form data
            const whatsappMessage = `*Pesan dari Website Falhan Jaya Medica*\n\n` +
                                   `*Nama:* ${name}\n` +
                                   `*Email:* ${email}\n` +
                                   `*Telepon:* ${phone}\n` +
                                   `*Pesan:*\n${message}`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp URL with your number
            const whatsappURL = `https://wa.me/6282239903088?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Display success message
            const successMessage = document.querySelector('.success-message');
            successMessage.textContent = 'Membuka WhatsApp... Silakan kirim pesan Anda!';
            successMessage.classList.add('show');
            
            // Clear form fields
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                successMessage.classList.remove('show');
            }, 5000);
        }
    });
}


/**
 * Initialize scroll animations
 * - Detect when elements come into view
 * - Add animated class to trigger CSS transitions
 * - Use Intersection Observer API for performance
 */
function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately if not supported
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
        return;
    }
    
    // Create Intersection Observer
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // trigger slightly before element enters viewport
        threshold: 0.1 // trigger when 10% of element is visible
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animated class when element comes into view
                entry.target.classList.add('animated');
                
                // Optional: stop observing after animation is triggered
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observe stagger animation containers
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    staggerContainers.forEach(container => {
        observer.observe(container);
    });
}


/**
 * Service Modal Data
 * Contains detailed information for each service
 */
const serviceData = {
    health: {
        title: 'Pemeriksaan Kesehatan',
        icon: 'fitness-outline',
        description: 'Kami menyediakan layanan pemeriksaan kesehatan lengkap dengan peralatan modern dan tenaga medis profesional. Jaga kesehatan Anda dengan pemeriksaan rutin untuk deteksi dini berbagai penyakit.',
        features: [
            'Pemeriksaan tekanan darah',
            'Cek gula darah dan kolesterol',
            'Pemeriksaan fungsi jantung (EKG)',
            'Tes urine dan darah lengkap',
            'Konsultasi dengan dokter umum',
            'Pemeriksaan berat badan dan BMI',
            'Hasil pemeriksaan dalam 24 jam'
        ],
        whatsappText: 'Halo, saya ingin konsultasi tentang layanan Pemeriksaan Kesehatan'
    },
    consultation: {
        title: 'Konsultasi Obat',
        icon: 'medical-outline',
        description: 'Dapatkan konsultasi gratis dengan apoteker berpengalaman kami. Kami siap membantu Anda memahami penggunaan obat yang tepat, efek samping, dan interaksi obat untuk keamanan maksimal.',
        features: [
            'Konsultasi gratis dengan apoteker profesional',
            'Penjelasan cara penggunaan obat yang benar',
            'Informasi efek samping dan kontraindikasi',
            'Saran obat alternatif jika diperlukan',
            'Konsultasi interaksi antar obat',
            'Rekomendasi vitamin dan suplemen',
            'Tersedia konsultasi via WhatsApp'
        ],
        whatsappText: 'Halo, saya ingin konsultasi tentang penggunaan obat'
    },
    prescription: {
        title: 'Layanan Resep',
        icon: 'document-text-outline',
        description: 'Proses resep dokter Anda dengan cepat dan akurat. Kami menjamin ketersediaan obat dan menyediakan layanan antar untuk kenyamanan Anda.',
        features: [
            'Proses resep cepat dan akurat',
            'Ketersediaan obat terjamin',
            'Layanan antar gratis (area tertentu)',
            'Verifikasi resep oleh apoteker',
            'Penjelasan aturan pakai obat',
            'Reminder jadwal minum obat',
            'Sistem pemesanan via WhatsApp'
        ],
        whatsappText: 'Halo, saya ingin menggunakan layanan resep'
    }
};

/**
 * Initialize Service Modal
 * - Add click handlers to service cards
 * - Show modal with service details
 * - Handle modal close
 */
function initServiceModal() {
    const modal = document.getElementById('serviceModal');
    
    // Safety check - if modal doesn't exist, exit
    if (!modal) {
        console.error('Service modal not found');
        return;
    }
    
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const serviceCards = document.querySelectorAll('.service-card');
    const learnMoreButtons = document.querySelectorAll('.service-learn-more');
    
    // Function to open modal with service data
    function openModal(serviceType) {
        const service = serviceData[serviceType];
        
        if (!service) {
            console.error('Service type not found:', serviceType);
            return;
        }
        
        // Update modal content
        const modalIcon = modal.querySelector('.modal-icon ion-icon');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');
        const featuresList = modal.querySelector('.features-list');
        const whatsappBtn = modal.querySelector('.modal-whatsapp-btn');
        
        // Safety checks
        if (!modalIcon || !modalTitle || !modalDescription || !featuresList || !whatsappBtn) {
            console.error('Modal elements not found');
            return;
        }
        
        modalIcon.setAttribute('name', service.icon);
        modalTitle.textContent = service.title;
        modalDescription.textContent = service.description;
        
        // Clear and populate features list
        featuresList.innerHTML = '';
        service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Update WhatsApp link
        const whatsappURL = `https://wa.me/6282239903088?text=${encodeURIComponent(service.whatsappText)}`;
        whatsappBtn.setAttribute('href', whatsappURL);
        
        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Add click handlers to service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button
            if (e.target.classList.contains('service-learn-more')) {
                return;
            }
            const serviceType = this.getAttribute('data-service');
            if (serviceType) {
                openModal(serviceType);
            }
        });
    });
    
    // Add click handlers to "Lihat Detail" buttons
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            const card = this.closest('.service-card');
            if (card) {
                const serviceType = card.getAttribute('data-service');
                if (serviceType) {
                    openModal(serviceType);
                }
            }
        });
    });
    
    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
