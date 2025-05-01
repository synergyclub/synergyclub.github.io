document.addEventListener("DOMContentLoaded", function() {
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline-container';

    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    timelineContainer.appendChild(timelineLine);

    const timelineEntries = document.querySelectorAll('.timeline');
    
    timelineEntries.forEach((entry, index) => {
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.style.left = `${(index / (timelineEntries.length - 1)) * 100}%`; // Positioning the dot

        const info = document.createElement('div');
        info.className = 'timeline-info';
        info.innerHTML = entry.innerHTML; // Get the content from the timeline div

        timelineContainer.appendChild(dot);
        timelineContainer.appendChild(info);
    });

    document.body.appendChild(timelineContainer);
});