function createNotificationBar(title, arrTips) { /* eslint-disable-line */
    function getLocalstorage(name) {
        return window.localStorage.getItem(name);
    }
    function setLocalstorage(name, val) {
        window.localStorage.setItem(name, val);
    }
    function deleteLocalstorage(name) {
        window.localStorage.removeItem(name);
    }

    function checkIsEscape(evt) {
        // eslint-disable-next-line no-param-reassign
        evt = evt || window.event;
        let isEscape = false;
        if ('key' in evt) {
            isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
        } else {
            isEscape = (evt.keyCode === 27);
        }
        return isEscape;
    }

    function isChecked(selector) {
        return document.querySelector(selector).checked;
    }

    const notifications = document.createElement('section');
    notifications.setAttribute('class', 'notifications hide');

    const notificationsContainer = document.createElement('div');
    notificationsContainer.setAttribute('class', 'notifications-container');

    const notificationsTitle = document.createElement('h1');
    notificationsTitle.setAttribute('class', 'notifications-title');
    const notificationsTitleContent = title || 'Email tip of the day';
    const notificationsTitleText = document.createTextNode(notificationsTitleContent);
    notificationsTitle.appendChild(notificationsTitleText);
    notifications.appendChild(notificationsTitle);

    let tipsCurrentIndex = 0;
    const tipsLength = arrTips.length;

    function buildTips(indexTip) {
        const notificationContainerDom = document.querySelector('.notifications-container');
        if (notificationContainerDom) {
            notificationContainerDom.innerHTML = '';
        }
        arrTips[indexTip].forEach((item) => {
            const itemElem = document.createElement('p');
            itemElem.setAttribute('class', 'notifications-item');
            itemElem.appendChild(document.createTextNode(item));
            notificationsContainer.appendChild(itemElem);
        });
    }
    buildTips(tipsCurrentIndex);

    notifications.appendChild(notificationsContainer);

    const notificationsFooter = document.createElement('footer');
    notificationsFooter.setAttribute('class', 'notifications-footer');

    const notificationsLabel = document.createElement('label');
    notificationsLabel.setAttribute('class', 'notifications-label');

    const notificationsLabelSpan = document.createElement('span');
    notificationsLabelSpan.setAttribute('class', 'notifications-label-text');
    const notificationsLabelSpanText = document.createTextNode('Disable Tips');
    notificationsLabelSpan.appendChild(notificationsLabelSpanText);

    const notificationsInput = document.createElement('input');
    notificationsInput.setAttribute('class', 'notifications-checkbox');
    notificationsInput.setAttribute('type', 'checkbox');

    if (getLocalstorage('hideNotifications')) {
        notificationsInput.checked = true;
    }

    notificationsLabel.appendChild(notificationsInput);
    notificationsLabel.appendChild(notificationsLabelSpan);
    notificationsFooter.appendChild(notificationsLabel);

    const notificationsControls = document.createElement('div');
    notificationsControls.setAttribute('class', 'notifications-controls');

    const notificationsControlsClose = document.createElement('button');
    notificationsControlsClose.setAttribute('class', 'notifications-controls-close');
    notificationsControlsClose.setAttribute('aria-label', 'close');
    const notificationsControlsCloseText = document.createTextNode('\u2715');
    notificationsControlsClose.appendChild(notificationsControlsCloseText);

    notificationsControls.appendChild(notificationsControlsClose);

    const notificationsConstrolLeft = document.createElement('button');
    notificationsConstrolLeft.setAttribute('class', 'notifications-constrol-btn notifications-constrol-left');
    const notificationsConstrolLeftText = document.createTextNode('\u276E');
    notificationsConstrolLeft.appendChild(notificationsConstrolLeftText);

    notificationsControls.appendChild(notificationsConstrolLeft);

    const notificationsList = document.createElement('ul');
    notificationsList.setAttribute('class', 'notifications-list');

    function buildDots(indexTip) {
        const notificationList = document.querySelector('.notifications-list');
        if (notificationList) {
            notificationList.innerHTML = '';
        }
        arrTips.forEach((item, index) => {
            const itemElem = document.createElement('li');
            if (index === indexTip) {
                itemElem.setAttribute('class', 'notifications-list-item current');
            } else {
                itemElem.setAttribute('class', 'notifications-list-item');
            }

            notificationsList.appendChild(itemElem);
        });
    }
    buildDots(tipsCurrentIndex);

    notificationsControls.appendChild(notificationsList);

    const notificationsConstrolRight = document.createElement('button');
    notificationsConstrolRight.setAttribute('class', 'notifications-constrol-btn notifications-constrol-right');
    const notificationsConstrolRightText = document.createTextNode('\u276F');
    notificationsConstrolRight.appendChild(notificationsConstrolRightText);

    notificationsControls.appendChild(notificationsConstrolRight);

    notificationsFooter.appendChild(notificationsControls);
    notifications.appendChild(notificationsFooter);

    document.body.appendChild(notifications);

    setTimeout(() => {
        if (getLocalstorage('hideNotifications')) {
            document.querySelector('.notifications-show').classList.remove('hide');
        } else {
            document.querySelector('.notifications').classList.remove('hide');
        }
    }, 1000);

    const btnShowNotifications = document.createElement('button');
    btnShowNotifications.setAttribute('class', 'notifications-show hide');
    const btnShowNotificationsText = document.createTextNode('Show tips of the day');
    btnShowNotifications.appendChild(btnShowNotificationsText);

    document.body.appendChild(btnShowNotifications);

    function moveTipsLeft(e) {
        if (tipsCurrentIndex > 0) {
            tipsCurrentIndex -= 1;
        } else {
            tipsCurrentIndex = (tipsLength - 1);
        }
        buildTips(tipsCurrentIndex);
        buildDots(tipsCurrentIndex);
        e.stopPropagation();
    }

    function moveTipsRight(e) {
        if (tipsCurrentIndex < (tipsLength - 1)) {
            tipsCurrentIndex += 1;
        } else {
            tipsCurrentIndex = 0;
        }
        buildTips(tipsCurrentIndex);
        buildDots(tipsCurrentIndex);
        e.stopPropagation();
    }

    document.querySelector('body').addEventListener('click', (e) => {
        const classListArr = [...e.target.classList];
        if (e.target.className === 'notifications-checkbox') {
            if (isChecked('.notifications-checkbox')) {
                setLocalstorage('hideNotifications', true);
            } else {
                deleteLocalstorage('hideNotifications');
            }
            e.stopPropagation();
        }

        if (e.target.className === 'notifications-controls-close') {
            document.querySelector('.notifications').classList.add('hide');
            document.querySelector('.notifications-show').classList.remove('hide');
            e.stopPropagation();
        }

        if (e.target.className === 'notifications-show') {
            document.querySelector('.notifications').classList.remove('hide');
            document.querySelector('.notifications-show').classList.add('hide');
            e.stopPropagation();
        }

        if (classListArr.some(item => item === 'notifications-constrol-left')) {
            moveTipsLeft(e);
        }

        if (classListArr.some(item => item === 'notifications-constrol-right')) {
            moveTipsRight(e);
        }
    }, false);

    document.querySelector('body').addEventListener('keydown', (e) => {
        if (checkIsEscape(e)) {
            document.querySelector('.notifications').classList.toggle('hide');
            document.querySelector('.notifications-show').classList.toggle('hide');
            e.preventDefault();
        }
    });

    const keys = [];

    function keysPressed(e) {
        keys[e.keyCode] = true;
        if (keys[18] && keys[39]) {
            moveTipsRight(e);
            e.preventDefault();
        }
        if (keys[18] && keys[37]) {
            moveTipsLeft(e);
            e.preventDefault();
        }
    }

    function keysReleased(e) {
        keys[e.keyCode] = false;
    }

    window.addEventListener('keydown', keysPressed, false);
    window.addEventListener('keyup', keysReleased, false);
}
