
function fetchData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                const userData={
                    userID: userId,
                firstName:"Siyavuya",
                lastName:"Khohlani",
                registrationDate:"10 June 2024" 
                }
                resolve(userData);
            } else {
                reject("invalid userID. it must be positive numbers.")
            }
        }, 1500);
    })
}

fetchData(-12465)
    .then((data) =>{
        console.log("Requested data fetched successfully:", data);
    })
    .catch((Error)=>{
        console.error("Error fetching the requested data:",Error);
    });

console.log();


function generateHtml(title,headerText,paragraphText){
    return `
    <!DOCTYPE html>
    <html>
    <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width,initial-scale=1.0">
     <title>${title}</title>
    </head>
    <body>
     <header>
      <h1>${headerText}</h1>
     </header>
     <main>
      <section>
       <p>${paragraphText}</p>
      </section>
     </main>
    </body>
    </html>
     `
}

const htmlGeneric = generateHtml("My story", "Covid 2019!","I am sitting in my room, just enjoying my quiet moment, browsing through social media.")

console.log(htmlGeneric)



function fetchUserPosts(userId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!userId) {
                reject(new Error("user ID is required to fetch posts."));
                return;
            }

            const posts =[
                {id: 1, title: "Hip hop", content: "Kendrik is the best rapper of all time", userId},
                {id: 2, title: "Amapiano", content: "Amapiona genre is currently taking over the music industry", userId},
                {id: 3, title: "breaking News", content: "Somalians are producing sausages made out from dogs meat", userId}
            ];
            resolve(posts);
        }, 1000);
    })
}

fetchUserPosts(3)
    .then(posts => console.log("Posts fetched:", posts))
    .catch(error => console.error("Error:", error.message));


//i used the 1st and the posts function
function fetchDataAndPosts(userId){
    return fetchData(userId)
        .then(userData => {
            return fetchUserPosts(userId)
                .then(posts => {
                    return { ...userData,posts };
                });
        })
        .catch(error => {
            console.error("An error occured:", error.message);
            throw error;
        })
}

fetchDataAndPosts(1)
    .then(data => console.log("Combined Data:", data))
    .catch(error => console.error("Error:", error.message));



async function fetchDataAndPosts(userId) {
    try {
        console.log("Fetching user data...")
        const userData = await fetchData(userId);
        console.log("data fetched:", userData);

        console.log("fetching user posts...")
        const posts = await fetchUserPosts(userId);
        console.log("User posts fetched:", posts);

        const bothData = { ...userData, posts};
        console.log("Combined data:", bothData)

        return bothData;
    } catch (error) {
        console.error("An error occured:", error.message);
        throw error;
    }
}

fetchDataAndPosts(1)
    .then(data => console.log("Final combined data:", data))
    .catch(error => console.error("Error:", error.message));



function fetchMultipleUsers(userIds) {
    // Map userIds to an array of Promises that fetch user data
    const userPromises = userIds.map(userId =>
        fetchData(userId).catch(error => {
            console.error(`Failed to fetch user with ID ${userId}:`, error);
            return null; // Return null for failed fetches
        })
    );

    return Promise.all(userPromises).then(results => {
        // Filter out null values (failed fetches)
        return results.filter(user => user !== null);
    });
}

// Example Usage
const userIds = [1, -1, 2, 3]; // Includes an invalid userId to demonstrate error handling
fetchMultipleUsers(userIds)
    .then(users => console.log("Successfully fetched users:", users))
    .catch(error => console.error("Error fetching users:", error));




