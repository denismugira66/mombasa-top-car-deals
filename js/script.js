// js/script.js - MN AUTO GROUP Complete Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initMobileMenu();
    initBackToTop();
    initCounters();
    initFeaturedVehicles();
    initServicesGrid();
    initServicesDetailed();
    initAllVehiclesPage();
    initTestimonialsPage();
    initTeamGrid();
    initContactForm();
    initFinancingCalculator();
    initLoanApplicationForm();
    initSmoothScroll();
});

// ============================================
// Loading Screen
// ============================================
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

// ============================================
// Mobile Menu
// ============================================
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

// ============================================
// Back to Top Button
// ============================================
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

// ============================================
// Animated Counters
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    const startCounters = () => {
        if (countersStarted) return;
        countersStarted = true;
        
        counters.forEach(counter => {
            const targetText = counter.innerText;
            const target = parseInt(targetText.replace(/[^0-9]/g, ''));
            if (isNaN(target)) return;
            
            let count = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    let displayValue = Math.floor(count);
                    if (targetText.includes('+')) {
                        counter.innerText = displayValue + '+';
                    } else if (targetText.includes('%')) {
                        counter.innerText = displayValue + '%';
                    } else {
                        counter.innerText = displayValue;
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = targetText;
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
    
    const statsSection = document.querySelector('.hero-stats, .stats-showcase');
    if (statsSection) observer.observe(statsSection);
}

// ============================================
// Featured Vehicles
// ============================================
function initFeaturedVehicles() {
    const vehiclesGrid = document.getElementById('featuredVehiclesGrid');
    
    if (vehiclesGrid) {
        const vehicles = [
            { name: 'Toyota Land Cruiser Prado', year: 2023, transmission: 'Automatic', mileage: '15,000 km', fuel: 'Diesel', price: 'KES 8,500,000', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=Land+Cruiser+Prado' },
            { name: 'Mercedes-Benz E-Class', year: 2022, transmission: 'Automatic', mileage: '22,000 km', fuel: 'Petrol', price: 'KES 9,200,000', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=Mercedes+E-Class' },
            { name: 'BMW X5', year: 2023, transmission: 'Automatic', mileage: '10,000 km', fuel: 'Diesel', price: 'KES 11,500,000', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=BMW+X5' },
            { name: 'Range Rover Sport', year: 2022, transmission: 'Automatic', mileage: '18,000 km', fuel: 'Diesel', price: 'KES 14,800,000', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=Range+Rover' }
        ];
        
        vehiclesGrid.innerHTML = vehicles.map(vehicle => `
            <div class="vehicle-card">
                <div class="vehicle-image" style="background-image: url('${vehicle.image}'); background-size: cover; background-position: center;"></div>
                <div class="vehicle-details">
                    <h3 class="vehicle-title">${vehicle.name}</h3>
                    <div class="vehicle-specs">
                        <span><i class="fas fa-calendar-alt"></i> ${vehicle.year}</span>
                        <span><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
                        <span><i class="fas fa-road"></i> ${vehicle.mileage}</span>
                        <span><i class="fas fa-gas-pump"></i> ${vehicle.fuel}</span>
                    </div>
                    <div class="vehicle-price">${vehicle.price}</div>
                    <div class="vehicle-location"><i class="fas fa-map-marker-alt"></i> ${vehicle.location}</div>
                    <button class="btn btn-primary btn-small inquire-btn" data-vehicle="${vehicle.name}">Inquire Now</button>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.inquire-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast(`Inquiry sent for ${btn.getAttribute('data-vehicle')}. We'll contact you shortly.`);
            });
        });
    }
}

// ============================================
// Services Grid (Homepage)
// ============================================
function initServicesGrid() {
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (servicesGrid) {
        const services = [
            { name: 'Vehicle Sales', icon: 'car', desc: 'Premium new and used vehicles from top brands' },
            { name: 'Vehicle Imports', icon: 'ship', desc: 'Professional import services from global markets' },
            { name: 'Financing Assistance', icon: 'hand-holding-usd', desc: 'Flexible financing options with competitive rates' },
            { name: 'Trade-In Services', icon: 'exchange-alt', desc: 'Fair value trade-in for your current vehicle' },
            { name: 'Vehicle Sourcing', icon: 'search', desc: 'Find any vehicle from anywhere in the world' }
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
// Services Detailed Page
// ============================================
function initServicesDetailed() {
    const servicesDetailedGrid = document.getElementById('servicesDetailedGrid');
    
    if (servicesDetailedGrid) {
        const services = [
            { name: 'Vehicle Sales', icon: 'car', desc: 'Browse our extensive collection of premium vehicles. From luxury sedans to powerful SUVs, we have the perfect car for every lifestyle.', longDesc: 'Our showroom features the finest selection of new and pre-owned vehicles from the world\'s most prestigious manufacturers. Each vehicle undergoes rigorous inspection to ensure quality and reliability.' },
            { name: 'Vehicle Imports', icon: 'ship', desc: 'Import any vehicle from Japan, UAE, Europe, or USA with our comprehensive import service. We handle everything from sourcing to customs clearance.', longDesc: 'Leverage our global network to import your dream vehicle with full documentation and warranty support. We handle shipping, customs clearance, and registration.' },
            { name: 'Financing Assistance', icon: 'hand-holding-usd', desc: 'Get pre-approved for auto financing with competitive interest rates and flexible repayment terms tailored to your budget.', longDesc: 'We partner with leading financial institutions to offer you the best financing solutions in the market. Get quick approval and drive your dream car sooner.' },
            { name: 'Trade-In Services', icon: 'exchange-alt', desc: 'Upgrade to your dream car with our fair and transparent trade-in program. Get an instant valuation for your current vehicle.', longDesc: 'Our trade-in process is quick, transparent, and designed to give you the best value for your current car. Simply bring your vehicle for inspection and get an offer.' },
            { name: 'Vehicle Sourcing', icon: 'search', desc: 'Can\'t find the specific vehicle you want? Let our expert sourcing team find it for you anywhere in the world.', longDesc: 'Our global network allows us to source any vehicle, any specification, from any market. Tell us what you want, and we\'ll find it for you.' }
        ];
        
        servicesDetailedGrid.innerHTML = services.map(service => `
            <div class="service-card">
                <i class="fas fa-${service.icon}"></i>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
                <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-light);">${service.longDesc}</p>
                <button class="btn btn-primary btn-small service-inquire" data-service="${service.name}" style="margin-top: 1rem;">Inquire About ${service.name}</button>
            </div>
        `).join('');
        
        document.querySelectorAll('.service-inquire').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast(`Inquiry sent for ${btn.getAttribute('data-service')}. We'll contact you shortly.`);
            });
        });
    }
}

// ============================================
// All Vehicles Page with Filtering
// ============================================
function initAllVehiclesPage() {
    const vehiclesGrid = document.getElementById('allVehiclesGrid');
    
    if (vehiclesGrid) {
        const allVehicles = [
            { name: 'Toyota Land Cruiser Prado', year: 2023, price: 8500000, priceFormatted: 'KES 8,500,000', brand: 'Toyota', transmission: 'Automatic', fuel: 'Diesel', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=Land+Cruiser+Prado' },
            { name: 'Mercedes-Benz E-Class', year: 2022, price: 9200000, priceFormatted: 'KES 9,200,000', brand: 'Mercedes', transmission: 'Automatic', fuel: 'Petrol', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=Mercedes+E-Class' },
            { name: 'BMW X5', year: 2023, price: 11500000, priceFormatted: 'KES 11,500,000', brand: 'BMW', transmission: 'Automatic', fuel: 'Diesel', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=BMW+X5' },
            { name: 'Range Rover Sport', year: 2022, price: 14800000, priceFormatted: 'KES 14,800,000', brand: 'Land Rover', transmission: 'Automatic', fuel: 'Diesel', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=Range+Rover' },
            { name: 'Audi Q7', year: 2023, price: 12500000, priceFormatted: 'KES 12,500,000', brand: 'Audi', transmission: 'Automatic', fuel: 'Petrol', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=Audi+Q7' },
            { name: 'Lexus LX570', year: 2022, price: 16200000, priceFormatted: 'KES 16,200,000', brand: 'Lexus', transmission: 'Automatic', fuel: 'Petrol', location: 'Mombasa', image: 'https://placehold.co/600x400/0B1F4D/D4AF37?text=Lexus+LX570' }
        ];
        
        function renderVehicles(vehicles) {
            if (vehicles.length === 0) {
                vehiclesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">No vehicles found matching your criteria</div>';
                return;
            }
            
            vehiclesGrid.innerHTML = vehicles.map(vehicle => `
                <div class="vehicle-card">
                    <div class="vehicle-image" style="background-image: url('${vehicle.image}'); background-size: cover; background-position: center;"></div>
                    <div class="vehicle-details">
                        <h3 class="vehicle-title">${vehicle.name}</h3>
                        <div class="vehicle-specs">
                            <span><i class="fas fa-calendar-alt"></i> ${vehicle.year}</span>
                            <span><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
                            <span><i class="fas fa-gas-pump"></i> ${vehicle.fuel}</span>
                        </div>
                        <div class="vehicle-price">${vehicle.priceFormatted}</div>
                        <div class="vehicle-location"><i class="fas fa-map-marker-alt"></i> ${vehicle.location}</div>
                        <button class="btn btn-primary btn-small vehicle-inquire" data-vehicle="${vehicle.name}">Inquire Now</button>
                    </div>
                </div>
            `).join('');
            
            document.querySelectorAll('.vehicle-inquire').forEach(btn => {
                btn.addEventListener('click', () => {
                    showToast(`Inquiry sent for ${btn.getAttribute('data-vehicle')}. We'll contact you shortly.`);
                });
            });
        }
        
        renderVehicles(allVehicles);
        
        const searchInput = document.getElementById('searchInput');
        const brandFilter = document.getElementById('brandFilter');
        const priceFilter = document.getElementById('priceFilter');
        const fuelFilter = document.getElementById('fuelFilter');
        
        function filterVehicles() {
            let filtered = [...allVehicles];
            const searchTerm = searchInput?.value.toLowerCase() || '';
            const brand = brandFilter?.value || 'all';
            const price = priceFilter?.value || 'all';
            const fuel = fuelFilter?.value || 'all';
            
            if (searchTerm) {
                filtered = filtered.filter(v => v.name.toLowerCase().includes(searchTerm));
            }
            if (brand !== 'all') {
                filtered = filtered.filter(v => v.brand === brand);
            }
            if (fuel !== 'all') {
                filtered = filtered.filter(v => v.fuel === fuel);
            }
            if (price !== 'all') {
                if (price === 'under5') filtered = filtered.filter(v => v.price < 5000000);
                else if (price === '5-10') filtered = filtered.filter(v => v.price >= 5000000 && v.price <= 10000000);
                else if (price === 'over10') filtered = filtered.filter(v => v.price > 10000000);
            }
            renderVehicles(filtered);
        }
        
        if (searchInput) searchInput.addEventListener('input', filterVehicles);
        if (brandFilter) brandFilter.addEventListener('change', filterVehicles);
        if (priceFilter) priceFilter.addEventListener('change', filterVehicles);
        if (fuelFilter) fuelFilter.addEventListener('change', filterVehicles);
    }
}

// ============================================
// Testimonials Page
// ============================================
function initTestimonialsPage() {
    const testimonialsGrid = document.getElementById('allTestimonialsGrid');
    
    if (testimonialsGrid) {
        const testimonials = [
            { name: 'John Mwangi', title: 'Business Executive', text: 'The team at MN AUTO GROUP made my first luxury car purchase seamless. Their professionalism and attention to detail are unmatched. From the initial consultation to the final delivery, everything was handled perfectly.', rating: 5 },
            { name: 'Sarah Hassan', title: 'Entrepreneur', text: 'I imported my Mercedes through MN AUTO GROUP. The process was smooth, transparent, and hassle-free. They handled all the paperwork and customs clearance. Highly recommended!', rating: 5 },
            { name: 'Michael Otieno', title: 'Finance Director', text: 'Their financing assistance helped me secure my dream car. Professional, efficient, and trustworthy service throughout. The interest rates were competitive and the approval process was quick.', rating: 5 },
            { name: 'Aisha Abdi', title: 'Medical Professional', text: 'Best car buying experience I have ever had. The team was knowledgeable, patient, and helped me find exactly what I was looking for within my budget.', rating: 5 },
            { name: 'David Kimani', title: 'CEO', text: 'MN AUTO GROUP is the definition of excellence. From vehicle selection to after-sales support, they exceed expectations at every turn.', rating: 5 },
            { name: 'Grace Wanjiku', title: 'Lawyer', text: 'I have bought three cars from MN AUTO GROUP over the years. Their consistency in quality and service keeps me coming back. Trustworthy and reliable.', rating: 5 }
        ];
        
        testimonialsGrid.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <i class="fas fa-quote-left"></i>
                <p>"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-name">${testimonial.name}</div>
                    <div class="author-title">${testimonial.title}</div>
                    <div class="stars">${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}</div>
                </div>
            </div>
        `).join('');
    }
}

// ============================================
// Team Grid
// ============================================
function initTeamGrid() {
    const teamGrid = document.getElementById('teamGrid');
    
    if (teamGrid) {
        const team = [
            { name: 'John Mwangi', role: 'CEO & Founder', icon: 'user-tie' },
            { name: 'Sarah Hassan', role: 'Operations Director', icon: 'user' },
            { name: 'Michael Otieno', role: 'Sales Manager', icon: 'chart-line' },
            { name: 'Aisha Abdi', role: 'Customer Relations', icon: 'headset' }
        ];
        
        teamGrid.innerHTML = team.map(member => `
            <div class="team-card">
                <i class="fas fa-${member.icon}"></i>
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            </div>
        `).join('');
    }
}

// ============================================
// Contact Form Handler
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you for your inquiry! Our team will respond within 24 hours.');
            contactForm.reset();
        });
    }
}

// ============================================
// Financing Calculator
// ============================================
function initFinancingCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const price = parseFloat(document.getElementById('vehiclePrice')?.value);
            const down = parseFloat(document.getElementById('downPayment')?.value) || 0;
            const rate = parseFloat(document.getElementById('interestRate')?.value) / 100 / 12;
            const months = parseInt(document.getElementById('loanTerm')?.value);
            const resultDiv = document.getElementById('result');
            
            if (isNaN(price) || price <= 0) {
                resultDiv.innerHTML = '<p style="color: #D62828;">Please enter a valid vehicle price</p>';
                return;
            }
            
            if (down >= price) {
                resultDiv.innerHTML = '<p style="color: #D62828;">Down payment cannot exceed vehicle price</p>';
                return;
            }
            
            const principal = price - down;
            const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
            
            if (isNaN(emi) || !isFinite(emi)) {
                resultDiv.innerHTML = '<p style="color: #D62828;">Please check your inputs</p>';
                return;
            }
            
            const formattedEmi = emi.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            const formattedTotal = (emi * months).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            
            resultDiv.innerHTML = `
                <h3>Monthly Installment</h3>
                <div class="amount">KES ${formattedEmi}</div>
                <p>for ${months} months at ${(rate * 1200).toFixed(1)}% APR</p>
                <p style="margin-top: 0.5rem; font-size: 0.8rem;">Total payable: KES ${formattedTotal}</p>
            `;
        });
    }
}

// ============================================
// Loan Application Form
// ============================================
function initLoanApplicationForm() {
    const loanForm = document.getElementById('loanApplicationForm');
    
    if (loanForm) {
        loanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Your loan application has been submitted. A representative will contact you within 24 hours.');
            loanForm.reset();
        });
    }
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '' && href !== '/') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    const scrollDown = document.querySelector('.hero-scroll');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
