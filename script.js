// Sticky header functionality
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar-wrapper');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });



  //location section
document.addEventListener('DOMContentLoaded', function() {
    const timeHeaders = document.querySelectorAll('.time-header');
    timeHeaders.forEach(header => {

        const targetId = header.getAttribute('data-bs-target');
        const collapseElement = document.querySelector(targetId);

        header.addEventListener('click', function(e) {
            e.preventDefault();

            header.classList.toggle('collapsed');

            header.classList.toggle('active');
            if (collapseElement) {
                if (collapseElement.classList.contains('show')) {
                    collapseElement.classList.remove('show');
                } else {

                    document.querySelectorAll('.time-content.show').forEach(content => {
                        if (content !== collapseElement) {
                            content.classList.remove('show');
                            const associatedHeader = document.querySelector(`[data-bs-target="#${content.id}"]`);
                            if (associatedHeader) {
                                associatedHeader.classList.add('collapsed');
                                associatedHeader.classList.remove('active');
                            }
                        }
                    });
                    
                    collapseElement.classList.add('show');
                }
            }
        });
        
        // Initialize the active state
        if (collapseElement && collapseElement.classList.contains('show')) {
            header.classList.add('active');
            header.classList.remove('collapsed');
        } else {
            header.classList.add('collapsed');
            header.classList.remove('active');
        }
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
 
      document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });

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