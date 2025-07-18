let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.style.transform = `rotate(${this.rotation}deg)`;

    paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.prevX = this.startX;
      this.prevY = this.startY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault(); // prevent scrolling
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      this.velX = touchX - this.prevX;
      this.velY = touchY - this.prevY;

      if (this.holdingPaper) {
        this.currentX += this.velX;
        this.currentY += this.velY;

        paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;

        this.prevX = touchX;
        this.prevY = touchY;
      }
    }, { passive: false });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = document.querySelectorAll('.paper');
papers.forEach(paper => new Paper().init(paper));


papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
