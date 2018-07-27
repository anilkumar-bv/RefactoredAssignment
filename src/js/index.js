import { loadInitialPage} from './views';
import { clearBox } from './services';
import {filterItems} from './controllers';

loadInitialPage();

document.getElementById('search').addEventListener('click', filterItems);
document.getElementById('backButton').addEventListener('click', () => {
    // clear the Contents of the Main div Tag
    clearBox('contentDiv');

    // Load Home Page
    loadInitialPage();
});