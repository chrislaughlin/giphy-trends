import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  h1 {
    color: #8608ff;
    font-size: 80px;
    text-transform: uppercase;
    box-shadow: 0 0 20px 2px white;
    padding: 20px;
  }
  
  button {
    height: 50px;
    width: 150px;
    border-radius: 12px;
    background: #e1ff00;
    font-size: 26px;
    font-weight: 900;
    color: #450c79;
  }
`;

const StyledGifGallery = styled.div`
  display: flex;
  flex-direction: column;
  
  .controls {
  
  }
  
  .gallery {
    display: flex;
    flex-wrap: wrap;
    div {
      margin: 10px;
    }
  
    .selected {
      opacity: 0.1;
    }
  }
  
`;

export {
    StyledApp,
    StyledGifGallery
};
