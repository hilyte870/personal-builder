document.getElementById("form").addEventListener("submit", async e => {
    e.preventDefault();
    const output = document.getElementById("output");
    output.innerHTML = '<div style="text-align:center; padding: 40px;">Forging your plan...</div>';

    const data = {
        goal: document.getElementById("goal").value,
        level: document.getElementById("level").value,
        days: Number(document.getElementById("days").value)
    };

    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const plan = await res.json();
        renderPlan(plan);
    } catch (err) {
        output.innerHTML = `<div style="color:red">Error: ${err.message}</div>`;
    }
});

function renderPlan(plan) {
    const output = document.getElementById("output");
    output.innerHTML = ""; // Clear loader

    const container = document.createElement("div");
    container.className = "plan-container";

    plan.program.forEach(day => {
        const card = document.createElement("div");
        card.className = "day-card";

        card.innerHTML = `
      <div class="day-header">
        <span class="day-title">${day.day}</span>
        <span class="focus-tag">${day.focus}</span>
      </div>
      <div class="exercise-list">
        ${day.exercises.map(ex => `
          <div class="exercise-item">
            <span class="exercise-name">${ex.name}</span>
            <span class="exercise-stats">${ex.sets} sets × ${ex.reps} reps</span>
          </div>
        `).join('')}
      </div>
    `;
        container.appendChild(card);
    });

    output.appendChild(container);
}
