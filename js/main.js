// Main JavaScript file for Apotek Sehat website

// Product data structure - Load from localStorage or use defaults
let products = JSON.parse(localStorage.getItem('products')) || [
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

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Pagination settings
let productsPerPage = 6;
let currentPage = 1;
let filteredProducts = [...products];

// Secret admin access
let logoClickCount = 0;
let logoClickTimer = null;
const ADMIN_USERNAME = 'user';
const ADMIN_PASSWORD = 'user';

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
    
    // Initialize product search and filter
    initProductSearch();
    initProductFilter();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize secret admin access
    initSecretAdmin();
    
    // Initialize show more functionality
    initShowMore();
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
 * Render product cards dynamically with pagination
 * - Loop through products array
 * - Generate HTML for each product card
 * - Insert cards into products container
 * - Handle pagination
 */
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) {
        console.error('Products grid container not found');
        return;
    }
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Calculate products to show
    const productsToShow = filteredProducts.slice(0, currentPage * productsPerPage);
    
    // Loop through products array and generate HTML for each product
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Update show more button visibility
    updateShowMoreButton();
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
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            submitBtn.classList.add('loading');
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            
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
            
            // Simulate a brief delay for better UX
            setTimeout(function() {
                // Open WhatsApp in new tab
                window.open(whatsappURL, '_blank');
                
                // Remove loading state
                submitBtn.classList.remove('loading');
                btnText.style.display = 'flex';
                btnLoader.style.display = 'none';
                
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
            }, 800);
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


/**
 * Initialize Product Search Functionality
 * - Real-time search as user types
 * - Search by product name, category, or description
 * - Case-insensitive search
 */
function initProductSearch() {
    const searchInput = document.getElementById('productSearch');
    
    if (!searchInput) {
        return;
    }
    
    // Add input event listener for real-time search
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterProducts(searchTerm);
    });
}

/**
 * Filter products based on search term
 * @param {string} searchTerm - Search query
 */
function filterProducts(searchTerm = '', category = 'all') {
    const noResults = document.querySelector('.no-results');
    
    // Filter products based on search and category
    filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productCategory = product.category.toLowerCase();
        const productDescription = product.description.toLowerCase();
        
        // Check if product matches search term
        const matchesSearch = searchTerm === '' || 
                             productName.includes(searchTerm) || 
                             productCategory.includes(searchTerm) || 
                             productDescription.includes(searchTerm);
        
        // Check if product matches category filter
        const matchesCategory = category === 'all' || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // Reset to first page
    currentPage = 1;
    
    // Render filtered products
    renderProducts();
    
    // Show/hide no results message
    if (filteredProducts.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

/**
 * Initialize Product Category Filter
 * - Filter products by category
 * - Works in combination with search
 */
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('productSearch');
    
    if (!filterButtons.length) {
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const category = this.getAttribute('data-category');
            
            // Get current search term
            const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
            
            // Filter products
            filterProducts(searchTerm, category);
        });
    });
}

/**
 * Initialize Back to Top Button
 * - Show button when user scrolls down
 * - Smooth scroll to top when clicked
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        return;
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.classList.remove('show');
            // Hide after transition completes
            setTimeout(() => {
                if (!backToTopBtn.classList.contains('show')) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Keyboard accessibility
    backToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

/**
 * Enhanced Product Rendering with Data Attributes
 * - Add data attributes for better filtering
 */
function createProductCard(product) {
    // Create product card container
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('data-category', product.category);
    
    // Create product image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image';
    
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'lazy';
    
    // Add error handler for image loading failures
    img.onerror = function() {
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
    
    // Add click handler to product button
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        openProductWhatsApp(product);
    });
    
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
    
    // Add click handler to entire card
    card.addEventListener('click', function() {
        openProductWhatsApp(product);
    });
    
    return card;
}

/**
 * Open WhatsApp with product inquiry
 * @param {Object} product - Product data
 */
function openProductWhatsApp(product) {
    const message = `Halo, saya ingin menanyakan tentang produk:\n\n` +
                   `*${product.name}*\n` +
                   `Kategori: ${product.category}\n` +
                   `Harga: Rp ${product.price.toLocaleString('id-ID')}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/6282239903088?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search for better performance
if (document.getElementById('productSearch')) {
    const searchInput = document.getElementById('productSearch');
    const debouncedSearch = debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active');
        const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        filterProducts(searchTerm, category);
    }, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
}


/**
 * Initialize Show More Functionality
 * - Show limited products initially
 * - Load more on button click
 */
function initShowMore() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    if (!showMoreBtn) {
        return;
    }
    
    showMoreBtn.addEventListener('click', function() {
        currentPage++;
        renderProducts();
    });
}

/**
 * Update Show More Button Visibility
 */
function updateShowMoreButton() {
    const showMoreContainer = document.querySelector('.show-more-container');
    const productsCount = document.querySelector('.products-count');
    
    if (!showMoreContainer) return;
    
    const totalProducts = filteredProducts.length;
    const shownProducts = Math.min(currentPage * productsPerPage, totalProducts);
    
    if (shownProducts < totalProducts) {
        showMoreContainer.style.display = 'block';
        if (productsCount) {
            productsCount.textContent = `Menampilkan ${shownProducts} dari ${totalProducts} produk`;
        }
    } else {
        showMoreContainer.style.display = 'none';
    }
}

/**
 * Initialize Secret Admin Access
 * - Click logo 5 times to reveal admin login
 */
function initSecretAdmin() {
    const logo = document.getElementById('secretLogo');
    
    if (!logo) return;
    
    logo.addEventListener('click', function() {
        logoClickCount++;
        
        // Reset counter after 2 seconds of inactivity
        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => {
            logoClickCount = 0;
        }, 2000);
        
        // Open admin login after 5 clicks
        if (logoClickCount >= 5) {
            logoClickCount = 0;
            openAdminLogin();
        }
    });
    
    // Initialize admin login form
    initAdminLogin();
    
    // Initialize admin panel
    initAdminPanel();
}

/**
 * Open Admin Login Modal
 */
function openAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on username field
        setTimeout(() => {
            document.getElementById('adminUsername').focus();
        }, 100);
    }
}

/**
 * Close Admin Login Modal
 */
function closeAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Clear form
        document.getElementById('adminLoginForm').reset();
        document.querySelector('.admin-error-message').textContent = '';
    }
}

/**
 * Initialize Admin Login
 */
function initAdminLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    const modal = document.getElementById('adminLoginModal');
    
    if (!loginForm) return;
    
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        const errorMsg = document.querySelector('.admin-error-message');
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Login successful
            closeAdminLogin();
            openAdminPanel();
        } else {
            // Login failed
            errorMsg.textContent = 'Username atau password salah!';
            
            // Shake animation
            loginForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
        }
    });
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAdminLogin);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeAdminLogin);
    }
}

/**
 * Open Admin Panel
 */
function openAdminPanel() {
    const modal = document.getElementById('adminPanelModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Refresh product list
        renderAdminProductsList();
    }
}

/**
 * Close Admin Panel
 */
function closeAdminPanel() {
    const modal = document.getElementById('adminPanelModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Refresh main products display
        filteredProducts = [...products];
        currentPage = 1;
        renderProducts();
    }
}

/**
 * Initialize Admin Panel
 */
function initAdminPanel() {
    const modal = document.getElementById('adminPanelModal');
    
    if (!modal) return;
    
    // Close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAdminPanel);
    }
    
    // Overlay
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeAdminPanel);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', closeAdminPanel);
    }
    
    // Add product form
    const addForm = document.getElementById('addProductForm');
    if (addForm) {
        addForm.addEventListener('submit', handleAddProduct);
    }
    
    // Edit product form
    const editForm = document.getElementById('editProductForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditProduct);
    }
}

/**
 * Handle Add Product
 */
function handleAddProduct(e) {
    e.preventDefault();
    
    const newProduct = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        image: document.getElementById('productImage').value || `https://via.placeholder.com/300x300/2563eb/ffffff?text=${encodeURIComponent(document.getElementById('productName').value)}`,
        description: document.getElementById('productDescription').value
    };
    
    products.push(newProduct);
    saveProducts();
    
    // Reset form
    e.target.reset();
    
    // Refresh admin list
    renderAdminProductsList();
    
    // Show success message
    alert('Produk berhasil ditambahkan!');
}

/**
 * Render Admin Products List
 */
function renderAdminProductsList() {
    const listContainer = document.getElementById('adminProductsList');
    
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    if (products.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #6b7280;">Belum ada produk</p>';
        return;
    }
    
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'admin-product-item';
        
        item.innerHTML = `
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <div class="admin-product-meta">
                    <span>
                        <ion-icon name="pricetag-outline"></ion-icon>
                        ${product.category}
                    </span>
                    <span>
                        <ion-icon name="cash-outline"></ion-icon>
                        Rp ${product.price.toLocaleString('id-ID')}
                    </span>
                </div>
            </div>
            <div class="admin-product-actions">
                <button class="admin-icon-btn edit" onclick="openEditModal(${product.id})" aria-label="Edit product">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
                <button class="admin-icon-btn delete" onclick="deleteProduct(${product.id})" aria-label="Delete product">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </div>
        `;
        
        listContainer.appendChild(item);
    });
}

/**
 * Open Edit Modal
 */
function openEditModal(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Fill form with product data
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image;
    document.getElementById('editProductDescription').value = product.description;
    
    // Show modal
    const modal = document.getElementById('editProductModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

/**
 * Close Edit Modal
 */
function closeEditModal() {
    const modal = document.getElementById('editProductModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('editProductForm').reset();
    }
}

/**
 * Handle Edit Product
 */
function handleEditProduct(e) {
    e.preventDefault();
    
    const productId = parseInt(document.getElementById('editProductId').value);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) return;
    
    products[productIndex] = {
        id: productId,
        name: document.getElementById('editProductName').value,
        category: document.getElementById('editProductCategory').value,
        price: parseInt(document.getElementById('editProductPrice').value),
        image: document.getElementById('editProductImage').value,
        description: document.getElementById('editProductDescription').value
    };
    
    saveProducts();
    closeEditModal();
    renderAdminProductsList();
    
    alert('Produk berhasil diupdate!');
}

/**
 * Delete Product
 */
function deleteProduct(productId) {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        return;
    }
    
    products = products.filter(p => p.id !== productId);
    saveProducts();
    renderAdminProductsList();
    
    alert('Produk berhasil dihapus!');
}

// Make functions globally accessible
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.deleteProduct = deleteProduct;

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
