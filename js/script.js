const overview = document.querySelector(".overview");
const username = "huntscato";
const repoList = document.querySelector(".repo-list");

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
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};
