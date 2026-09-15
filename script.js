document.addEventListener("DOMContentLoaded", function () {

    const splash = document.getElementById("splash-screen");
    const loginPage = document.getElementById("login-page");
    const careerSetup = document.getElementById("career-setup");
    const app = document.getElementById("app");

    const loginForm = document.getElementById("login-form");
    const createRoadmapBtn =
        document.getElementById("create-roadmap-btn");


    /* ================= START ================= */

    splash.style.display = "flex";
    loginPage.style.display = "none";
    careerSetup.style.display = "none";
    app.style.display = "none";


    /* ================= SPLASH ================= */

    setTimeout(function () {

        splash.style.display = "none";
        loginPage.style.display = "flex";

    }, 3000);


    /* ================= LOGIN ================= */

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();


        if (email === "" || password === "") {

            alert("Please enter email and password.");
            return;

        }


        loginPage.style.display = "none";
        careerSetup.style.display = "flex";
        app.style.display = "none";

    });


    /* ================= CAREER OPTIONS ================= */

    const careerButtons =
        document.querySelectorAll("[data-career]");

    const careerGoal =
        document.getElementById("career-goal");


    careerButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            careerGoal.value =
                this.dataset.career;


            careerButtons.forEach(function (btn) {

                btn.classList.remove("selected");

            });


            this.classList.add("selected");

        });

    });


    /* ================= CREATE ROADMAP ================= */

    createRoadmapBtn.addEventListener("click", async function () {

        const goal =
            careerGoal.value.trim();

        const level =
            document.getElementById("career-level").value;

        const target =
            document.getElementById("career-target").value;


        if (goal === "") {

            alert("Please choose or enter your career goal.");
            return;

        }


        if (level === "") {

            alert("Please select your current level.");
            return;

        }


        if (target === "") {

            alert("Please select your main target.");
            return;

        }


        /* ================= SEND CAREER SETUP ================= */

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/career-setup",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            careerGoal: goal,
                            level: level,
                            target: target

                        })
                    }
                );


            const data =
                await response.json();


            console.log(
                "Backend Response:",
                data
            );


            if (!response.ok) {

                throw new Error(
                    "Backend request failed"
                );

            }


            /* ================= GET USER ID ================= */

            const userId =
                data.user._id;


            localStorage.setItem(
                "growpathUserId",
                userId
            );


            console.log(
                "User ID:",
                userId
            );


            /* ================= CREATE BASIC ROADMAP ================= */

            const roadmapResponse =
                await fetch(
                    "http://localhost:5000/api/roadmap",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            userId: userId,

                            careerGoal: goal,

                            level: level,

                            target: target,

                            skills: [

                                {
                                    name: "Java",

                                    description:
                                        "Learn Java programming fundamentals"
                                },

                                {
                                    name: "Data Structures",

                                    description:
                                        "Learn basic data structures and algorithms"
                                },

                                {
                                    name: "SQL",

                                    description:
                                        "Learn databases and SQL queries"
                                }

                            ]

                        })
                    }
                );


            const roadmapData =
                await roadmapResponse.json();


            console.log(
                "Roadmap Response:",
                roadmapData
            );


            if (!roadmapResponse.ok) {

                throw new Error(
                    "Roadmap creation failed"
                );

            }


            /* ================= SHOW APPLICATION ================= */

            careerSetup.style.display = "none";
            app.style.display = "flex";


            /* ================= UPDATE DASHBOARD GOAL ================= */

            const dashboardGoal =
                document.getElementById(
                    "dashboard-goal"
                );


            if (dashboardGoal) {

                dashboardGoal.textContent =
                    goal;

            }


            /* ================= UPDATE ROADMAP GOAL ================= */

            const roadmapGoal =
                document.getElementById(
                    "roadmap-goal"
                );


            if (roadmapGoal) {

                roadmapGoal.textContent =
                    "🎯 " + goal;

            }


            /* ================= OPEN DASHBOARD ================= */

            showPage("dashboard");


            /* ================= LOAD ROADMAP ================= */

            loadRoadmap();


            alert(
                "Your roadmap has been created successfully! 🎉"
            );


        } catch (error) {

            console.error(
                "Error:",
                error
            );


            alert(
                "Could not create your roadmap. Please make sure the backend server is running."
            );

        }

    });


    /* ================= PAGE NAVIGATION ================= */

    const navLinks =
        document.querySelectorAll(".nav-link");

    const pages =
        document.querySelectorAll(".page");

    const pageTitle =
        document.getElementById("page-title");

    const pageSubtitle =
        document.getElementById("page-subtitle");


    const pageInfo = {

        dashboard: {

            title: "Dashboard",

            subtitle:
                "Your learning journey at a glance."

        },

        roadmap: {

            title: "My Roadmap",

            subtitle:
                "Your personalized path to becoming job-ready."

        },

        learn: {

            title: "Learn",

            subtitle:
                "Discover resources and build your skills."

        },

        practice: {

            title: "Practice",

            subtitle:
                "Strengthen your skills through practice."

        },

        projects: {

            title: "Projects",

            subtitle:
                "Build real projects and showcase your skills."

        },

        progress: {

            title: "Progress",

            subtitle:
                "Track your learning journey."

        },

        certificates: {

            title: "Certificates",

            subtitle:
                "Track your achievements and certifications."

        },

        assistant: {

            title: "AI Assistant",

            subtitle:
                "Your personal AI learning companion."

        },

        settings: {

            title: "Settings",

            subtitle:
                "Manage your learning preferences."

        }

    };


    /* ================= SHOW PAGE ================= */

    function showPage(pageName) {

        pages.forEach(function (page) {

            page.style.display = "none";

        });


        const selectedPage =
            document.getElementById(
                pageName + "-page"
            );


        if (selectedPage) {

            selectedPage.style.display =
                "block";

        }


        navLinks.forEach(function (link) {

            link.classList.remove("active");


            if (
                link.dataset.page === pageName
            ) {

                link.classList.add("active");

            }

        });


        if (pageInfo[pageName]) {

            pageTitle.textContent =
                pageInfo[pageName].title;

            pageSubtitle.textContent =
                pageInfo[pageName].subtitle;

        }

    }


    /* ================= NAVIGATION LINKS ================= */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showPage(
                    this.dataset.page
                );

            }
        );

    });


    /* ================= DASHBOARD BUTTONS ================= */

    const pageButtons =
        document.querySelectorAll(
            "[data-page-button]"
        );


    pageButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                showPage(
                    this.dataset.pageButton
                );

            }
        );

    });


    /* ================= LOGOUT ================= */

    const logoutButton =
        document.getElementById("logout-btn");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                app.style.display = "none";

                careerSetup.style.display =
                    "none";

                loginPage.style.display =
                    "flex";


                document.getElementById(
                    "email"
                ).value = "";


                document.getElementById(
                    "password"
                ).value = "";

            }
        );

    }


    /* ================= AI CHAT ================= */

    const sendChat =
        document.getElementById("send-chat");

    const chatInput =
        document.getElementById("chat-input");


    if (sendChat && chatInput) {

        sendChat.addEventListener(
            "click",
            function () {

                const message =
                    chatInput.value.trim();


                if (message === "") {

                    return;

                }


                alert(
                    "GrowPath AI will answer this question after we connect the backend."
                );


                chatInput.value = "";

            }
        );

    }


    /* ================= LOAD ROADMAP ================= */

    async function loadRoadmap() {

        const userId =
            localStorage.getItem(
                "growpathUserId"
            );


        if (!userId) {

            console.log(
                "No GrowPath User ID found."
            );

            return;

        }


        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/roadmap/${userId}`
                );


            const data =
                await response.json();


            if (!response.ok) {

                console.log(
                    "Roadmap not found"
                );

                return;

            }


            const roadmap =
                data.roadmap;


            console.log(
                "Loaded Roadmap:",
                roadmap
            );


            /* ================= UPDATE ROADMAP GOAL ================= */

            const roadmapGoal =
                document.getElementById(
                    "roadmap-goal"
                );


            if (roadmapGoal) {

                roadmapGoal.textContent =
                    "🎯 " +
                    roadmap.careerGoal;

            }


            /* ================= UPDATE DASHBOARD GOAL ================= */

            const dashboardGoal =
                document.getElementById(
                    "dashboard-goal"
                );


            if (dashboardGoal) {

                dashboardGoal.textContent =
                    roadmap.careerGoal;

            }


            /* ================= ROADMAP STATISTICS ================= */

            const totalSkills =
                roadmap.skills
                    ? roadmap.skills.length
                    : 0;


            const completedSkills =
                roadmap.skills
                    ? roadmap.skills.filter(
                        skill => skill.completed
                    ).length
                    : 0;


            const progress =
                totalSkills > 0
                    ? Math.round(
                        (completedSkills / totalSkills) * 100
                    )
                    : 0;


            console.log(
                "Total Skills:",
                totalSkills
            );


            console.log(
                "Completed Skills:",
                completedSkills
            );


            console.log(
                "Progress:",
                progress + "%"
            );


            /* ================= UPDATE DASHBOARD STATS ================= */

            const topicsCompleted =
                document.getElementById(
                    "topics-completed"
                );


            if (topicsCompleted) {

                topicsCompleted.textContent =
                    completedSkills;

            }


            const overallProgress =
                document.getElementById(
                    "overall-progress"
                );


            if (overallProgress) {

                overallProgress.textContent =
                    progress + "%";

            }


            /* ================= ROADMAP CONTAINER ================= */

            const container =
                document.getElementById(
                    "roadmap-container"
                );


            if (!container) {

                console.log(
                    "Roadmap container not found."
                );

                return;

            }


            container.innerHTML = "";


            /* ================= CHECK SKILLS ================= */

            if (
                !roadmap.skills ||
                roadmap.skills.length === 0
            ) {

                container.innerHTML = `

                    <div class="roadmap-loading">

                        No roadmap skills found.

                    </div>

                `;

                return;

            }


            /* ================= CREATE ROADMAP STEPS ================= */

            roadmap.skills.forEach(
                function (skill, index) {

                    let stepClass =
                        "roadmap-step";

                    let status =
                        "UPCOMING";

                    let statusClass =
                        "upcoming-status";

                    let number =
                        index + 1;


                    /* COMPLETED */

                    if (skill.completed) {

                        stepClass +=
                            " completed";

                        status =
                            "COMPLETED";

                        statusClass =
                            "completed-status";

                        number =
                            "✓";

                    }


                    /* CURRENT */

                    else if (index === 0) {

                        stepClass +=
                            " current";

                        status =
                            "CURRENT";

                        statusClass =
                            "current-status";

                    }


                    /* CREATE STEP */

                    const step =
                        document.createElement(
                            "div"
                        );


                    step.className =
                        stepClass;


                    /* ================= STEP HTML ================= */

                    step.innerHTML = `

                        <div class="step-number">

                            ${number}

                        </div>


                        <div class="step-content">

                            <span class="status ${statusClass}">

                                ${status}

                            </span>


                            <h3>

                                ${index + 1}.
                                ${skill.name}

                            </h3>


                            <p>

                                ${skill.description}

                            </p>


                            <div class="tag-list">

                                <span>

                                    ${skill.name}

                                </span>

                            </div>


                            <button
                                class="complete-btn"
                                data-roadmap-id="${roadmap._id}"
                                data-skill-id="${skill._id}"
                                data-completed="${skill.completed}"
                            >

                                ${skill.completed
                                    ? "✓ Completed"
                                    : "Mark Complete"}

                            </button>

                        </div>

                    `;


                    container.appendChild(
                        step
                    );


                    /* ================= COMPLETE BUTTON ================= */

                    const completeButton =
                        step.querySelector(
                            ".complete-btn"
                        );


                    completeButton.addEventListener(
                        "click",
                        async function () {

                            const roadmapId =
                                this.dataset.roadmapId;

                            const skillId =
                                this.dataset.skillId;

                            const completed =
                                this.dataset.completed !== "true";


                            try {

                                const response =
                                    await fetch(
                                        `http://localhost:5000/api/roadmap/${roadmapId}/skill/${skillId}`,
                                        {
                                            method: "PUT",

                                            headers: {
                                                "Content-Type": "application/json"
                                            },

                                            body: JSON.stringify({

                                                completed:
                                                    completed

                                            })

                                        }
                                    );


                                if (!response.ok) {

                                    throw new Error(
                                        "Failed to update skill"
                                    );

                                }


                                /* Reload roadmap */

                                loadRoadmap();


                            } catch (error) {

                                console.error(
                                    "Error updating skill:",
                                    error
                                );


                                alert(
                                    "Could not update your progress."
                                );

                            }

                        }
                    );

                }
            );

        }


        catch (error) {

            console.error(
                "Error loading roadmap:",
                error
            );

        }

    }


    /* ================= INITIAL LOAD ================= */

    loadRoadmap();


    /* ================= INITIAL DASHBOARD ================= */

    pages.forEach(function (page) {

        page.style.display = "none";

    });

});