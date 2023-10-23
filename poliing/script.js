document.addEventListener("DOMContentLoaded", function () {
    const pollContainer = document.querySelector(".poll-container");
    const optionsContainer = document.getElementById("poll-options");
    const addOptionButton = document.getElementById("add-option");
    const createPollButton = document.getElementById("create-poll");
    const resultsContainer = document.getElementById("results");

    addOptionButton.addEventListener("click", function () {
        const newOption = document.createElement("input");
        newOption.type = "text";
        newOption.classList.add("option");
        newOption.placeholder = "Option " + (optionsContainer.children.length + 1);
        optionsContainer.appendChild(newOption);
    });

    createPollButton.addEventListener("click", function () {
        const pollQuestion = document.getElementById("poll-question").value;
        const options = Array.from(document.querySelectorAll(".option")).map(option => option.value);

        if (pollQuestion && options.length > 1) {
            createPoll(pollQuestion, options);
            pollContainer.style.display = "none";
            resultsContainer.style.display = "block";
        } else {
            alert("Please enter a question and at least two options.");
        }
    });

    function createPoll(question, options) {
        const resultsContainer = document.getElementById("results-container");

        const pollResults = document.createElement("div");
        pollResults.classList.add("poll-results");

        const questionElement = document.createElement("h3");
        questionElement.innerText = question;
        pollResults.appendChild(questionElement);

        options.forEach((option) => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("option-result");

            const barElement = document.createElement("div");
            barElement.classList.add("bar");
            const voteCount = document.createElement("div");
            voteCount.classList.add("vote-count");
            voteCount.innerText = "0 votes";

            optionElement.appendChild(barElement);
            optionElement.appendChild(voteCount);
            pollResults.appendChild(optionElement);

            // Simulate voting (you'd replace this with actual vote handling)
            optionElement.addEventListener("click", function () {
                const votes = parseInt(voteCount.innerText);
                voteCount.innerText = (votes + 1) + " votes";
                updateBars();
            });
        });

        resultsContainer.appendChild(pollResults);
    }

    function updateBars() {
        const allOptions = document.querySelectorAll(".option-result");
        allOptions.forEach(optionElement => {
            const bar = optionElement.querySelector(".bar");
            const voteCount = parseInt(optionElement.querySelector(".vote-count").innerText);
            const totalVotes = Array.from(allOptions).reduce((total, option) => {
                return total + parseInt(option.querySelector(".vote-count").innerText);
            }, 0);
            const percentage = (totalVotes === 0) ? 0 : (voteCount / totalVotes) * 100;
            bar.style.width = percentage + "%";
        });
    }
});
