const gptDOM = (function () {
  // Private variables and functions
  let batchUpdates = false;
  let updateQueue = [];
  let updateTimer = null;

  function scheduleUpdate() {
    if (!updateTimer) {
      updateTimer = requestAnimationFrame(processUpdates);
    }
  }

  function processUpdates() {
    const updates = updateQueue.slice();
    updateQueue = [];
    updateTimer = null;
    batchUpdates = false;

    // Process the updates
    for (let i = 0; i < updates.length; i++) {
      updates[i]();
    }
  }

  // Public API
  return {
    // Register a plugin
    registerPlugin: function (plugin) {
      plugin.init(this);
    },

    // Append elements to a parent element
    append: function (parent, elements) {
      if (Array.isArray(elements)) {
        for (let i = 0; i < elements.length; i++) {
          parent.appendChild(elements[i]);
        }
      } else {
        parent.appendChild(elements);
      }
    },

    // Prepend elements to a parent element
    prepend: function (parent, elements) {
      if (Array.isArray(elements)) {
        for (let i = elements.length - 1; i >= 0; i--) {
          parent.insertBefore(elements[i], parent.firstChild);
        }
      } else {
        parent.insertBefore(elements, parent.firstChild);
      }
    },

    // Batch updates
    batch: function (fn) {
      batchUpdates = true;
      fn();
      scheduleUpdate();
    },

    // Add your other gptDOM functions here...
  };
})();
