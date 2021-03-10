// varijable

const card = document.querySelector('#card');
const input = document.querySelector('.github__input');
const form = document.querySelector('.github__form');

// basic api cals

const basicUrl = `https://api.github.com/users/`;
const repoUrl = `https://api.github.com/users//repos`;

// pozivanje forme
form.addEventListener('submit', getGithubUser);
form.addEventListener('submit', getGithubRepos);

// izlistavanje svih github usera

function getGithubUser(e) {
  e.preventDefault();

  axios
    .get(basicUrl + input.value)
    .then((res) => {
      let githubProfile = res.data;

      showGithbubCard(githubProfile);

      input.value = '';
    })

    .catch((err) => {
      console.log(err);

      errorCard();
    });
}
function getGithubRepos(e) {
  e.preventDefault();

  axios.get(basicUrl + input.value + '/repos').then((res) => {
    let githubRepo = res.data;

    showGitHubRepo(githubRepo);
  });
}

// dom prikaz usera

function showGithbubCard(githubProfile) {
  card.classList.add('github__card');
  card.innerHTML = `
 <img class="github__img" src=${githubProfile.avatar_url} alt='' />
       <div class="github__info">
          <h2 class="github__title">${githubProfile.name}</h2> 
          <p>${githubProfile.bio}</p>
          <div class="github__stuff">
            <p>${githubProfile.followers} followers</p>
            <p>${githubProfile.following} following</p>
            <p>${githubProfile.public_repos} repos</p>
          </div>
          <div class="github__repos">
           
            
          </div>
       </div>

</div>
 `;
}

// prikaz naziva repositorijuma usera

function showGitHubRepo(githubRepo) {
  const gitRepos = document.querySelector('.github__repos');

  githubRepo.slice(0, 5).forEach((item) => {
    return (gitRepos.innerHTML += `<span class='github__repo'>${item.name}</span>`);
  });
}

// prikaz greske, u slucaju da u inputu stoji profil koji ne postoji

function errorCard() {
  card.classList.add('github__card');
  card.innerHTML = `<h1>nisi dobro ukucao naziv profila</h1>`;
}
