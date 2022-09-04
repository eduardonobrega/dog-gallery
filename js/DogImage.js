import { img } from './img.js';

export class DogImage {
  constructor(root) {
    this.root = document.querySelector(root);
    this.gallery = this.root.querySelector('section');
    this.addButton = this.root.querySelector('#search button');
    this.load();
    this.addEvents();
  }

  async load() {
    this.dogs =
      JSON.parse(localStorage.getItem('@dogs-img:')) || (await img.get());
    this.update();
  }

  save() {
    localStorage.setItem('@dogs-img:', JSON.stringify(this.dogs));
  }

  addEvents() {
    this.addButton.addEventListener('click', () => {
      this.add();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        this.add();
      }
    });
  }

  async add() {
    const input = this.addButton.previousElementSibling;
    const value = input.value.toLowerCase();
    try {
      if (value == '') throw new Error('Informe a raça do doguinho');

      const dogs = await img.get(value)
      
      if (dogs.length > 0) {
        this.dogs = [...dogs];
        this.update();
        this.save();
      } else {
        throw new Error('Raça não encontrada');
      }
    } catch (error) {
      alert(error);
    }
  }

  update() {
    this.removeAllImg();

    this.dogs.forEach((url) => {
      const card = this.createCard();

      card.querySelector('img').src = url;

      card.querySelector('button').onclick = () => {
        img.download(url);
      };

      this.gallery.append(card);
    });
  }

  createCard() {
    const card = document.createElement('div');
    card.classList.add('card-img');

    card.innerHTML = `
      <button>
      <span class="material-symbols-outlined">
      downloading
      </span>
      </button>
      <img src="" alt=""/>
    `;

    return card;
  }

  removeAllImg() {
    const imgs = this.gallery.querySelectorAll('.card-img');
    imgs.forEach((img) => img.remove());
  }
  
}
