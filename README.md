# Stopwatch Web Application

A responsive, high-precision stopwatch web application built with pure HTML5, CSS3, and vanilla JavaScript.

## Features

- **Drift-Free Time Tracking**: Utilizes delta timestamp calculations (`Date.now() - startTime`) rather than raw interval counts to guarantee accurate time measurement.
- **Precision Display**: Displays time in `HH:MM:SS.cs` (hours, minutes, seconds, centiseconds).
- **Core Controls**:
  - **Start**: Initiates or resumes elapsed time tracking.
  - **Pause**: Freezes the display without clearing accumulated time.
  - **Lap**: Records split times and cumulative times to a scrollable lap list (with 3-lap fixed window).
  - **Reset**: Stops the stopwatch, resets the timer to `00:00:00.00`, and clears recorded laps.
- **Fixed Layout & Buttons**: Prevents layout shifts and button movement when recording laps.
- **Scrollable Laps**: Retains all recorded laps in a scrollable list with a custom-styled scrollbar.
- **Zero External Dependencies**: Pure standard web technologies.

## File Structure

```text
├── index.html    # Application structure
├── style.css     # Responsive styles and theme
├── script.js     # Timer logic, delta math, and DOM handlers
└── README.md     # Documentation
```

## How to Run

Simply open `index.html` in any modern web browser.
