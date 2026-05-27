// js/script.js - Complete Interactive Features

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initMobileMenu();
    initBackToTop();
    initDarkMode();
    initCounters();
    initFeaturedCars();
    initServicesGrid();
    initFaqAccordion();
    initContactButtons();
    initFinancingCalculator();
    initContactForm();
    initListingsPage();
    initAllServicesPage();
});


function initLoadingScreen() {
    setTimeout(() => {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    }, 800);
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}


function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    
    if (backBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backBtn.style.display = 'flex';
            } else {
                backBtn.style.display = 'none';
            }
        });
        
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}


function initDarkMode() {
    const darkToggle = document.getElementById('darkModeToggle');
    
    if (darkToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            
            if (document.body.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
}


function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    const startCounters = () => {
        if (countersStarted) return;
        countersStarted = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);
}

// ============================================
// Featured Cars Data
// ============================================
function initFeaturedCars() {
    const carsGrid = document.getElementById('featuredCarsGrid');
    
    if (carsGrid) {
        const cars = [
            {
                name: 'Toyota Prado',
                year: 2022,
                transmission: 'Automatic',
                mileage: '45,000 km',
                fuel: 'Diesel',
                price: 'KES 7,200,000',
                location: 'Mombasa CBD',
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Toyota+Prado'
            },
            {
                name: 'Mazda CX5',
                year: 2021,
                transmission: 'Automatic',
                mileage: '30,000 km',
                fuel: 'Petrol',
                price: 'KES 4,500,000',
                location: 'Nyali',
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Mazda+CX5'
            },
            {
                name: 'Subaru Forester',
                year: 2023,
                transmission: 'CVT',
                mileage: '15,000 km',
                fuel: 'Petrol',
                price: 'KES 5,200,000',
                location: 'Mombasa West',
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Subaru+Forester'
            },
            {
                name: 'Nissan Xtrail',
                year: 2020,
                transmission: 'Automatic',
                mileage: '60,000 km',
                fuel: 'Petrol',
                price: 'KES 3,900,000',
                location: 'Likoni',
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Nissan+Xtrail'
            },
            {
                name: 'Mercedes C200',
                year: 2022,
                transmission: 'Automatic',
                mileage: '22,000 km',
                fuel: 'Petrol',
                price: 'KES 9,100,000',
                location: 'Mombasa CBD',
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Mercedes+C200'
            },
            {
                name: 'Toyota Hilux',
                year: 2023,
                transmission: 'Manual',
                mileage: '12,000 km',
                fuel: 'Diesel',
                price: 'KES 6,800,000',
                location: 'Mombasa',
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Toyota+Hilux'
            }
        ];
        
        carsGrid.innerHTML = cars.map(car => `
            <div class="card">
                <div class="car-img" style="background-image: url('${car.image}');"></div>
                <div class="car-details">
                    <h3>${car.name}</h3>
                    <p><i class="fas fa-calendar-alt"></i> ${car.year} | <i class="fas fa-cog"></i> ${car.transmission} | <i class="fas fa-road"></i> ${car.mileage}</p>
                    <p><i class="fas fa-gas-pump"></i> ${car.fuel}</p>
                    <p class="price">${car.price}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${car.location}</p>
                    <button class="btn btn-details view-car" data-car="${car.name}">View Details</button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to view car buttons
        document.querySelectorAll('.view-car').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const carName = btn.getAttribute('data-car');
                showToast(`Contact us about ${carName}: Call 0704 054119`);
            });
        });
    }
}

// ============================================
// Services Grid for Home Page
// ============================================
function initServicesGrid() {
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (servicesGrid) {
        const services = [
            { name: 'Car Financing', icon: 'hand-holding-usd', desc: 'Competitive auto loans with flexible terms' },
            { name: 'Vehicle Importation', icon: 'ship', desc: 'Full import services from Japan, UAE, UK' },
            { name: 'Insurance', icon: 'shield-alt', desc: 'Comprehensive coverage options' },
            { name: 'Car Detailing', icon: 'spray-can', desc: 'Premium interior and exterior detailing' },
            { name: 'Mechanical Services', icon: 'wrench', desc: 'Certified mechanics for all makes' },
            { name: 'Spare Parts', icon: 'oil-can', desc: 'Genuine and quality aftermarket parts' },
            { name: 'Vehicle Inspection', icon: 'search', desc: 'Pre-purchase inspection reports' },
            { name: 'Car Tracking', icon: 'satellite-dish', desc: 'GPS tracking installation' }
        ];
        
        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card">
                <i class="fas fa-${service.icon}"></i>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
            </div>
        `).join('');
    }
}

// ============================================
// All Services Page
// ============================================
function initAllServicesPage() {
    const allServicesGrid = document.getElementById('allServicesGrid');
    
    if (allServicesGrid) {
        const allServices = [
            { name: 'Professional Mechanics', icon: 'wrench', desc: 'Certified mechanics for all vehicle makes and models. On-site and mobile services available.' },
            { name: 'Car Detailing', icon: 'spray-can', desc: 'Premium interior and exterior detailing services. Ceramic coating and paint protection.' },
            { name: 'Towing Services', icon: 'truck', desc: '24/7 emergency towing across Mombasa and surrounding areas. Fast response time.' },
            { name: 'Transport Logistics', icon: 'shipping-fast', desc: 'Vehicle transport and logistics solutions across Kenya.' },
            { name: 'Insurance Services', icon: 'shield-alt', desc: 'Comprehensive vehicle insurance coverage from leading providers.' },
            { name: 'Importation', icon: 'ship', desc: 'Full vehicle importation from Japan, UAE, UK with customs clearance.' },
            { name: 'Spare Parts', icon: 'oil-can', desc: 'Genuine and quality aftermarket spare parts for all brands.' },
            { name: 'Diagnostics', icon: 'microchip', desc: 'Advanced computer diagnostics and repair services.' },
            { name: 'Paint & Body', icon: 'paint-brush', desc: 'Professional paint jobs and body repair services.' },
            { name: 'AC Repair', icon: 'snowflake', desc: 'Air conditioning repair and maintenance.' },
            { name: 'Battery Services', icon: 'car-battery', desc: 'Battery testing, replacement, and jump-start services.' },
            { name: 'Tire Services', icon: 'circle', desc: 'Tire sales, rotation, balancing, and alignment.' }
        ];
        
        allServicesGrid.innerHTML = allServices.map(service => `
            <div class="service-card">
                <i class="fas fa-${service.icon}"></i>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
                <button class="btn btn-small btn-primary service-inquiry" data-service="${service.name}">Inquire Now</button>
            </div>
        `).join('');
        
        document.querySelectorAll('.service-inquiry').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast(`Inquiry sent for ${btn.getAttribute('data-service')}. We'll contact you shortly.`);
            });
        });
    }
}


function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

function initContactButtons() {
    document.querySelectorAll('.contact-dealer, .view-dealer').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Dealer contact info will be shared. Call 0704 054119 for immediate assistance.');
        });
    });
    
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://chat.whatsapp.com/', '_blank');
        });
    }
}

function initFinancingCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const price = parseFloat(document.getElementById('carPrice')?.value);
            const down = parseFloat(document.getElementById('downPayment')?.value) || 0;
            const rate = parseFloat(document.getElementById('interestRate')?.value) / 100 / 12;
            const months = parseInt(document.getElementById('loanTerm')?.value);
            const resultDiv = document.getElementById('result');
            
            if (isNaN(price) || price <= 0) {
                resultDiv.innerHTML = '<p style="color: var(--red);">Please enter a valid car price</p>';
                return;
            }
            
            if (down >= price) {
                resultDiv.innerHTML = '<p style="color: var(--red);">Down payment cannot exceed car price</p>';
                return;
            }
            
            const principal = price - down;
            const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
            
            if (isNaN(emi) || !isFinite(emi)) {
                resultDiv.innerHTML = '<p style="color: var(--red);">Please check your inputs</p>';
                return;
            }
            
            resultDiv.innerHTML = `
                <h3>Monthly Installment</h3>
                <div class="amount">KES ${emi.toFixed(0)}</div>
                <p>for ${months} months at ${(rate * 1200).toFixed(1)}% APR</p>
                <p style="margin-top: 0.5rem; font-size: 0.8rem;">Total payable: KES ${(emi * months).toFixed(0)}</p>
            `;
        });
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const loanForm = document.getElementById('loanApplicationForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you for your inquiry! Our team will respond within 24 hours.');
            contactForm.reset();
        });
    }
    
    if (loanForm) {
        loanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Your loan application has been submitted.We will contact you soon.');
            loanForm.reset();
        });
    }
}


function initListingsPage() {
    const listingsGrid = document.getElementById('allListingsGrid');
    
    if (listingsGrid) {
        const allListings = [
            { 
                name: 'Toyota Prado TX', 
                year: 2022, 
                price: 'KES 7,200,000', 
                brand: 'Toyota', 
                transmission: 'Automatic', 
                fuel: 'Diesel', 
                body: 'SUV', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Toyota+Prado' 
            },

            { 
                name: 'Mazda CX5', 
                year: 2021, 
                price: 'KES 4,500,000', 
                brand: 'Mazda', 
                transmission: 'Automatic', 
                fuel: 'Petrol', 
                body: 'SUV', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Mazda+CX5' 
            },

            { 
                name: 'Subaru Forester', 
                year: 2023, 
                price: 'KES 5,200,000', 
                brand: 'Subaru', 
                transmission: 'CVT', 
                fuel: 'Petrol', 
                body: 'SUV', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Subaru+Forester' 
            },

            { 
                name: 'Nissan Xtrail', 
                year: 2020, 
                price: 'KES 3,900,000', 
                brand: 'Nissan', 
                transmission: 'Automatic', 
                fuel: 'Petrol', 
                body: 'SUV', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Nissan+Xtrail' 
            },

            {
                name: 'Mercedes C200', 
                year: 2022,
                price: 'KES 9,100,000', 
                brand: 'Mercedes', 
                transmission: 'Automatic', 
                fuel: 'Petrol', 
                body: 'Sedan', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Mercedes+C200' 
            },

            { 
                name: 'Toyota Hilux', 
                year: 2023, 
                price: 'KES 6,800,000', 
                brand: 'Toyota', 
                transmission: 'Manual', 
                fuel: 'Diesel', 
                body: 'Pickup', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Toyota+Hilux' 
            },

            { 
                name: 'Honda CRV', 
                year: 2021, 
                price: 'KES 4,200,000', 
                brand: 'Honda', 
                transmission: 'Automatic', 
                fuel: 'Petrol', 
                body: 'SUV', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Honda+CRV' 
            },

            { 
                name: 'BMW X5', 
                year: 2022, 
                price: 'KES 12,500,000', 
                brand: 'BMW', 
                transmission: 'Automatic', 
                fuel: 'Diesel', 
                body: 'SUV', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=BMW+X5' 
            },

            { 
                name: 'Range Rover Sport', 
                year: 2023, 
                price: 'KES 15,000,000', 
                brand: 'Land Rover', 
                transmission: 'Automatic', 
                fuel: 'Diesel', 
                body: 'SUV', 
                image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=Range+Rover' 
            },

            {
                 name: 'Volkswagen Golf', 
                 year: 2021, 
                 price: 'KES 3,500,000', 
                 brand: 'Volkswagen', 
                 transmission: 'Automatic', 
                 fuel: 'Petrol', 
                 body: 'Hatchback', 
                 image: 'https://placehold.co/400x240/0D0D0D/F5B301?text=VW+Golf' 
                },
        ];
        
        function renderListings(listings) {
            listingsGrid.innerHTML = listings.map(car => `
                <div class="card">
                    <div class="car-img" style="background-image: url('${car.image}');"></div>
                    <div class="car-details">
                        <h3>${car.name}</h3>
                        <p>${car.year} | ${car.transmission}</p>
                        <p><i class="fas fa-gas-pump"></i> ${car.fuel}</p>
                        <p class="price">${car.price}</p>
                        <button class="btn btn-details listing-view" data-car="${car.name}">View Details</button>
                    </div>
                </div>
            `).join('');
            
            document.querySelectorAll('.listing-view').forEach(btn => {
                btn.addEventListener('click', () => {
                    showToast(`Contact us about ${btn.getAttribute('data-car')}: Call 0704 054119`);
                });
            });
        }
        
        renderListings(allListings);
        
        const searchInput = document.getElementById('searchInput');
        const brandFilter = document.getElementById('brandFilter');
        const transmissionFilter = document.getElementById('transmissionFilter');
        const fuelFilter = document.getElementById('fuelFilter');
        
        function filterListings() {
            let filtered = [...allListings];
            const searchTerm = searchInput?.value.toLowerCase() || '';
            const brand = brandFilter?.value || 'all';
            const transmission = transmissionFilter?.value || 'all';
            const fuel = fuelFilter?.value || 'all';
            
            if (searchTerm) {
                filtered = filtered.filter(car => car.name.toLowerCase().includes(searchTerm));
            }
            if (brand !== 'all') {
                filtered = filtered.filter(car => car.brand === brand);
            }
            if (transmission !== 'all') {
                filtered = filtered.filter(car => car.transmission === transmission);
            }
            if (fuel !== 'all') {
                filtered = filtered.filter(car => car.fuel === fuel);
            }
            renderListings(filtered);
        }
        
        if (searchInput) searchInput.addEventListener('input', filterListings);
        if (brandFilter) brandFilter.addEventListener('change', filterListings);
        if (transmissionFilter) transmissionFilter.addEventListener('change', filterListings);
        if (fuelFilter) fuelFilter.addEventListener('change', filterListings);
    }
}


function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});