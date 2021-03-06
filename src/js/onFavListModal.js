import { fetchMoviesInfoForModal } from '../services/apiService';
import { onStarIconcheck } from './starIconClick';
import { onCrossPress } from './modalCrossIconClick';

import getRefs from './get-refs';
const refs = getRefs();

export async function manageFavListModal() {
  refs.favouriteList.addEventListener('click', openModal);

  async function openModal(e) {
    const modalFavList = document.querySelectorAll('.fav-list-name');

    console.log(e.target);

    for (let listItem of modalFavList) {
      if (e.target === listItem) {
        window.addEventListener('keydown', onEscPress);
        refs.backdropContainer.classList.add('is-open');

        const id = e.target.id;

        await fetchMoviesInfoForModal(id);
        manageStarInModalFav(id);
        onCrossPress();
      }
    }
  }
}

function manageStarInModalFav(id) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.filter(favorite => {
    if (favorite === id) {
      const backdrop = document.querySelector('.backdrop.is-open');
      const backdropChild = backdrop.querySelector('.modal-container');
      const starIcon = backdropChild.querySelector('.modal-icon');
      starIcon.classList.add('checked');
      starIcon.addEventListener('click', onStarIconcheck);
    }
  });
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress);
  refs.backdropContainer.classList.remove('is-open');
  refs.backdropContainer.innerHTML = '';
}

function onEscPress(e) {
  const isEscKey = e.code === 'Escape';
  if (isEscKey) {
    onCloseModal();
  }
}
