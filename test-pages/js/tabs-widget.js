// Tabs functionality with keyboard navigation
const tabs = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

// Tab switching function
function switchTab(newTab) {
    // Deactivate all tabs
    tabs.forEach(tab => {
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
    });

    // Hide all panels
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
    });

    // Activate the new tab
    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    newTab.focus();

    // Show the associated panel
    const panelId = newTab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    panel.classList.add('active');
}

// Click event for tabs
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        switchTab(e.target);
    });

    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(tabs).indexOf(e.target);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            let newIndex;
            
            if (e.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % tabs.length;
            } else {
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            }
            
            switchTab(tabs[newIndex]);
        } else if (e.key === 'Home') {
            e.preventDefault();
            switchTab(tabs[0]);
        } else if (e.key === 'End') {
            e.preventDefault();
            switchTab(tabs[tabs.length - 1]);
        }
    });
});
