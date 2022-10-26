
; (async () => {
    const setLeaderboardAnchorTag = ({ leaderboardId }) => {
        const leaderboardEntriesLink = document.getElementById("leaderboard-entries-link");
        leaderboardEntriesLink.setAttribute("href", `https://cf-blast.livelikecdn.com/api/v1/leaderboards/${leaderboardId}/entries/`);
        console.log(leaderboardEntriesLink);
    };

    const createUserProfileAsync = async ({ clientId }) => {
        const url = `https://cf-blast.livelikecdn.com/api/v1/applications/${clientId}/profile/`;
        const response = await fetch(url, {
            method: 'POST',
            body: "{}"
        });
        return await response.json();
    };

    const creditUserProfileAsync = async ({ profileId, producerToken, rewardItemId, rewardItemAmount }) => {
        const url = `https://cf-blast.livelikecdn.com/api/v1/profiles/${profileId}/reward-item-credits/`;
        const body = {
            reward_item_id: rewardItemId,
            reward_item_amount: rewardItemAmount
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${producerToken}`
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    };

    const createLeaderboardEntry = async ({ clientId, producerToken, rewardItemId, rewardItemAmount }) => {
        const userProfile = await createUserProfileAsync({ clientId: clientId });
        const response = await creditUserProfileAsync({ profileId: userProfile.id, producerToken, rewardItemId, rewardItemAmount });
        console.log(response);
    };

    const getRandomInteger = () => {
        return Math.floor(Math.random() * 100);
    };

    const createLeaderboardEntries = async ({ clientId, producerToken, rewardItemId, numberOfEntries }) => {
        for (let index = 0; index < numberOfEntries; index++) {
            await createLeaderboardEntry({ clientId, producerToken, rewardItemId, rewardItemAmount: getRandomInteger() });
        }
    };

    const submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", async () => {
        const clientId = document.getElementById("client-id").value;
        const producerToken = document.getElementById("producer-token").value;
        const leaderboardId = document.getElementById("leaderboard-id").value;
        const rewardItemId = document.getElementById("reward-item-id").value;
        const numberOfEntries = document.getElementById("number-of-entries").value;
        console.log("clicked");
        console.log(leaderboardId);
        setLeaderboardAnchorTag({ leaderboardId });
        await createLeaderboardEntries({ clientId, producerToken, rewardItemId, numberOfEntries });
    });
})();