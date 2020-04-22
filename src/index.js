(function () {
  const CARD_LABEL_ATTR = 'data-card-filter';
  const ESTIMATE_TITLE_CLASS = 'title-estimate';
  function updateColumn() {
    const columns = [...document.querySelectorAll('div.project-column')];
    for (let column of columns) {
      const title = column.querySelector('button.column-menu-item');
      const labels = [...column.querySelectorAll(`button[${CARD_LABEL_ATTR}^="label:e/"]`)];
      const estimateCount = labels.map(l => +l.getAttribute(CARD_LABEL_ATTR).match(/\d+/)[0]).reduce((sum, w) => sum + w, 0);
      let estimateElement = title.querySelector(`.${ESTIMATE_TITLE_CLASS}`);

      if (estimateCount === 0) {
        if (estimateElement) {
          estimateElement.remove();
        }
        continue;
      }

      if (!estimateElement) {
        estimateElement = labels[0].cloneNode(true);
        estimateElement.classList.add(ESTIMATE_TITLE_CLASS);
        estimateElement.setAttribute(CARD_LABEL_ATTR, '');
        estimateElement = title.appendChild(estimateElement);
      }

      const newText = `${estimateCount}`;
      const currentText = estimateElement.innerHTML;
      if (newText !== currentText) {
        estimateElement.innerHTML = newText;
      }
    }
  }

  function createDotStyles() {
    const dotStyles = [...new Array(300)].map((_, weight) =>
      `button[${CARD_LABEL_ATTR}^="label:e/${weight}"]::after {content: '${weight}';}`
    );
    const style = document.createElement('style');
    style.innerHTML = dotStyles.join('\n');
    document.body.appendChild(style);
  }

  createDotStyles();
  updateColumn();
  setInterval(updateColumn, 200);
})();
