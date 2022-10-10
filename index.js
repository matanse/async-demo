console.log("before");

// Callback-based approach
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log("commits: ", commits);
    });
  });
});

// Promise-based approach
// getUser(1)
//   .then((user) => {
//     console.log(user);
//     return getRepositories(user.gitHubUsername);
//   })
//   .then((repos) => {
//     console.log(repos);
//     return getCommits(repos[0]);
//   })
//   .then((commits) => console.log("Commits: ", commits))
//   .catch((err) => console.log(err.message));

// Async and Await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    console.log(user);
    const repos = await getRepositories(user.gitHubUsername);
    console.log(repos);
    const commits = await getCommits(repos[0]);
    console.log("commits: ", commits);
  } catch (err) {
    console.log("Error: ", err.message);
  }
}
displayCommits();
console.log("after");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`reading user${id} from a database...`);
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`getting repositories from ${username}'s gitHub...`);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`getting commits...`);
      resolve(repo);
    }, 2000);
  });
}
