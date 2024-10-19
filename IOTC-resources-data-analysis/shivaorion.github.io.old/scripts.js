document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const tagList = document.getElementById("tag-list");

  // Supported image extensions (case-insensitive)
  const extensions = ['png', 'jpg', 'jpeg'];

  // Simulating loading all images in the directory
  const images = [
    'shiva-andromeda.jpeg',
    'parvati-and-lordShiva;ecstaticLove.jpeg',
    'athena-angel.jpg',
    'humanFamily-wordFamily.jpeg',
    'fifthImage.jpeg'
  ];

  const allTags = new Set();
  const imageCards = [];

  // Function to capitalize words properly
  function capitalize(tag) {
    return tag.charAt(0).toUpperCase() + tag.slice(1);
  }

  // Function to generate tags from file names
  function generateTags(fileName) {
    // Remove the file extension
    const baseName = fileName.replace(/\.[^/.]+$/, '');

    // Split by common delimiters: '-', '_', ';' and camelCase
    let words = baseName
      .split(/[-_;]+|(?=[A-Z])/)
      .map(word => word.toLowerCase());

    const tags = new Set();

    // Add all single words as tags (capitalize each word)
    words.forEach(word => {
      const properTag = capitalize(word);
      tags.add(properTag);
    });

    return Array.from(tags);
  }

  // Function to create gallery cards for images
  function createImageCards() {
    images.forEach(image => {
      const extension = image.split('.').pop().toLowerCase(); // Convert to lowercase for case insensitivity
      if (extensions.includes(extension)) {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const imgElement = document.createElement('img');
        imgElement.src = `images/${image}`; // Correct image path
        imgElement.alt = image.split('.')[0]; // Alt text based on file name

        const tagElement = document.createElement('p');
        const tags = generateTags(image);
        tags.forEach(tag => allTags.add(tag)); // Add tags to the global tag set
        tagElement.textContent = tags.map(tag => `#${tag}`).join(' '); // Display tags

        const buyButton = document.createElement('a');
        buyButton.href = '#'; // Placeholder for purchase link
        buyButton.textContent = 'Buy Poster';
        buyButton.classList.add('buy-button');

        imageCard.appendChild(imgElement);
        imageCard.appendChild(tagElement);
        imageCard.appendChild(buyButton);

        imageCard.dataset.tags = tags.join(' '); // Store tags in data attribute for filtering
        gallery.appendChild(imageCard);
        imageCards.push(imageCard); // Store card for filtering
      }
    });
  }

  // Function to create the tag menu
  function createTagMenu() {
    allTags.forEach(tag => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = capitalize(tag); // Ensure the tags in the menu are capitalized
      link.addEventListener('click', () => filterByTag(tag)); // Add filter event
      listItem.appendChild(link);
      tagList.appendChild(listItem);
    });
  }

  // Function to filter the gallery by tag
  function filterByTag(tag) {
    imageCards.forEach(card => {
      const cardTags = card.dataset.tags;
      if (cardTags.includes(tag)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  createImageCards();
  createTagMenu();
});
