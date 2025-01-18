// Sticky header functionality
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar-wrapper');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Toggle menu function
    function toggleMenu() {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        } else {
            navbarCollapse.classList.add('show');
            navbarToggler.setAttribute('aria-expanded', 'true');
        }
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbar.contains(event.target);
        
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Toggle menu on button click
    navbarToggler.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent document click from immediately closing
        toggleMenu();
    });

    // Scroll functionality
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});




  //location section
  document.addEventListener('DOMContentLoaded', function() {
    const timeHeaders = document.querySelectorAll('.time-header');
    
    // Initialize first section as active
    const firstHeader = timeHeaders[0];
    firstHeader.classList.add('active');
    firstHeader.classList.remove('collapsed');
    
    timeHeaders.forEach(header => {
        const targetId = header.getAttribute('data-bs-target');
        const collapseElement = document.querySelector(targetId);

        header.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all headers
            timeHeaders.forEach(h => {
                h.classList.remove('active');
                h.classList.add('collapsed');
            });

            // Hide all content sections
            document.querySelectorAll('.time-content').forEach(content => {
                content.classList.remove('show');
            });

            // Toggle current section
            if (collapseElement) {
                header.classList.toggle('collapsed');
                header.classList.toggle('active');
                collapseElement.classList.toggle('show');
            }
        });
    });
});
  //location section end


       // Gallery data
       const galleryImages = [
        {
            src: './images/gallery1.png',
            title: 'Main Building Exterior',
            description: 'Front view of our modern apartment complex featuring contemporary architecture and landscaping.'
        },
   
        {
            src: './images/gallery3.png',
            title: 'Interior Bedroom',
            description: 'Spacious bedroom with modern furnishings and natural lighting.'
        },
        {
            src: './images/gallery4.png',
            title: 'Floor Plan Layout',
            description: 'Detailed floor plan showing the efficient use of space and room arrangements.'
        }
    ];

    let currentImageIndex = 0;

    function showGalleryDetails(index = 0) {
        document.getElementById('galleryMain').style.display = 'none';
        document.getElementById('galleryDetails').style.display = 'block';
        currentImageIndex = index;
        updateImageDisplay();
        populateThumbnails();
    }

    function showGalleryMain() {
        document.getElementById('galleryMain').style.display = 'block';
        document.getElementById('galleryDetails').style.display = 'none';
    }

    function updateImageDisplay() {
        const mainImage = document.getElementById('mainImage');
        const imageTitle = document.getElementById('imageTitle');
        const imageDescription = document.getElementById('imageDescription');
        
        mainImage.src = galleryImages[currentImageIndex].src;
        imageTitle.textContent = galleryImages[currentImageIndex].title;
        imageDescription.textContent = galleryImages[currentImageIndex].description;

        // Update thumbnails active state
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }

    function navigateImage(direction) {
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        updateImageDisplay();
    }

    function populateThumbnails() {
        const stripContainer = document.getElementById('thumbnailStrip');
        stripContainer.innerHTML = '';
        
        galleryImages.forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${index === currentImageIndex ? 'active' : ''}`;
            thumb.onclick = () => {
                currentImageIndex = index;
                updateImageDisplay();
            };
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.title;
            
            thumb.appendChild(img);
            stripContainer.appendChild(thumb);
        });
    }
    // Gallery data

// projects
    const toggleViewBtn = document.getElementById('toggleViewBtn');
    const hiddenProperties = document.querySelectorAll('.hidden-property');
    let isExpanded = false;

    toggleViewBtn.addEventListener('click', function () {
        isExpanded = !isExpanded;

        hiddenProperties.forEach(property => {
            if (isExpanded) {
                property.classList.add('show');
            } else {
                property.classList.remove('show');
            }
        });

        // Update button text
        this.textContent = isExpanded ? 'View Less' : 'View All';

        // Smooth scroll to new content when expanding
        if (isExpanded) {
            const lastProperty = hiddenProperties[hiddenProperties.length - 1];
            lastProperty.scrollIntoView({ behavior: 'smooth' });
        }
    });
    // projects

 // faq
 
    // Hide all answers initially
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });

    // Add click event listeners to FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', function() {
            const answer = this.querySelector('.faq-answer');
            const isCurrentlyActive = this.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.display = 'none';
            });
            
            // Toggle current item only if it wasn't already active
            if (!isCurrentlyActive) {
                this.classList.add('active');
                if (answer) answer.style.display = 'block';
            }
        });
    });
    // faq

 // a life fide animation
    document.addEventListener('DOMContentLoaded', () => {
        const fadeElements = document.querySelectorAll('.fade-in');
    
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target); // Stop observing once the animation is triggered
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of the element is visible
            }
        );
    
        fadeElements.forEach(element => observer.observe(element));
    });
    