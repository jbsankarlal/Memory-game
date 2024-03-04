import "./App.css"
import React, { useState, useEffect } from 'react';

const Game = () => {
  const initialImages = [
    { id: 1, name: 'apple', url: 'https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg' },
    { id: 2, name: 'mango', url: 'https://5.imimg.com/data5/SELLER/Default/2023/9/344928632/OW/RQ/XC/25352890/yellow-mango.jpeg' },
    { id: 3, name: 'grapes', url: 'https://rukminim2.flixcart.com/image/850/1000/kt0enww0/plant-seed/h/h/n/25-dg-214-paudha-original-imag6fgvre6bmd5y.jpeg?q=90&crop=false' }
  ];

  const additionalImages = [
    { id: 4, name: 'orange', url: 'https://media.istockphoto.com/id/185284489/photo/orange.jpg?s=612x612&w=0&k=20&c=m4EXknC74i2aYWCbjxbzZ6EtRaJkdSJNtekh4m1PspE=' },
    { id: 5, name: 'guava', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMi9KDfhYptrA5BFY9RoQpOVWdkEW_srkQQ&usqp=CAU' },
    { id: 6, name: 'pineapple', url: 'https://yogisorganic.com/cdn/shop/products/Pineapple_600x@2x.jpg?v=1496866405' }
  ];



  const [images, setImages] = useState([]); // Initially empty
  const [selectedImages, setSelectedImages] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    const shuffledImages = [...initialImages, ...additionalImages].sort(() => Math.random() - 0.5); // Shuffle combined images
    setImages(shuffledImages); // Set initial shuffled images - imp check why once
    startCountdown();
  }, []);

  const startCountdown = () => {
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownTimer);
      setCountdown(0);
    }, 5000);
  };

  const handleClick = (selectedImage) => {
    const isCorrect = initialImages.some((image) => image.id === selectedImage.id);
    setSelectedImages([...selectedImages, { id: selectedImage.id, result: isCorrect }]);

    if (selectedImages.length === initialImages.length) {
      setShowResult(true);
    }
  };

  return (
    <div className="board">
      <h2>Guess the Images</h2>
      <div className="container">
        {images.map((image) => (
          <div className="image-container" key={image.id} onClick={() => handleClick(image)}>
            <img src={image.url} alt={image.name} />
            <p>{image.name}</p>
            {selectedImages.map((selectedImage) => (
              (selectedImage.id === image.id && selectedImage.result) ? (
                <span key={image.id}>&#10004;</span> // Show tick only for correct initial images
              ) : null
            ))}
            {selectedImages.map((selectedImage) => (
              (selectedImage.id === image.id && !selectedImage.result) ? (
                <span key={image.id}>&#10008;</span> // Show cross only for incorrect initial images
              ) : null
            ))}
          </div>
        ))}
      </div>
      {countdown >= 0 && <p>Countdown: {countdown}</p>}
      {showResult && (
        <div>
          {selectedImages.length === initialImages.length ? (
            <p>All Correct!</p>
          ) : (
            <p>Try Again!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;