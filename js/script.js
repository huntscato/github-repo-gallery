const overview = document.querySelector(".overview");
const username = "huntscato";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


const gitProfileInfo = async function () { 
const profileInfo = await fetch (`https://api.github.com/users/${username}`);
const data = await profileInfo.json();
displayUserInfo(data);
};

gitProfileInfo();




//console.log(gitProfileInfo);

const displayUserInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt = "user avatar" src = ${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of Public Repos:</strong> ${data.public_repos}</p> 
    </div>
    `;

    overview.append(div);
    userRepos();
};

const userRepos = async function() {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    repoInfo(repoData);
}; 

const repoInfo = function(repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
})

const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoResponse = await fetchInfo.json();
    console.log(repoResponse);
    const fetchLanguages = await fetch(repoResponse.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoResponse, languages);
     
};

const displayRepoInfo = function(repoResponse, languages) {
    backButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoResponse.name}</h3>
    <p>Description: ${repoResponse.description}</p>
    <p>Default Branch: ${repoResponse.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoResponse.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;

    repoData.append(div);

};

backButton.addEventListener("click", function() {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowercaseText = searchText.toLowerCase();

    for (const repo of repos) {
        const lowerText = repo.innerText.toLowerCase();
        if (lowerText.includes(lowercaseText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});