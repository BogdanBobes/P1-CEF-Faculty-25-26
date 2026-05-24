function $3753ea3bc829a0e7$var$_toConsumableArray(arr) {
    return $3753ea3bc829a0e7$var$_arrayWithoutHoles(arr) || $3753ea3bc829a0e7$var$_iterableToArray(arr) || $3753ea3bc829a0e7$var$_unsupportedIterableToArray(arr) || $3753ea3bc829a0e7$var$_nonIterableSpread();
}
function $3753ea3bc829a0e7$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $3753ea3bc829a0e7$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $3753ea3bc829a0e7$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $3753ea3bc829a0e7$var$_arrayLikeToArray(o, minLen);
}
function $3753ea3bc829a0e7$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $3753ea3bc829a0e7$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $3753ea3bc829a0e7$var$_arrayLikeToArray(arr);
}
function $3753ea3bc829a0e7$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $3753ea3bc829a0e7$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $3753ea3bc829a0e7$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $3753ea3bc829a0e7$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $3753ea3bc829a0e7$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $3753ea3bc829a0e7$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function $3753ea3bc829a0e7$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
var $3753ea3bc829a0e7$export$de3e1d2ea3b4fd9b = /*#__PURE__*/ function() {
    function ModalService() {
        $3753ea3bc829a0e7$var$_classCallCheck(this, ModalService);
        $3753ea3bc829a0e7$var$_defineProperty(this, "instance", void 0);
        $3753ea3bc829a0e7$var$_defineProperty(this, "modalStack", []);
        $3753ea3bc829a0e7$var$_defineProperty(this, "originalModal", void 0);
        $3753ea3bc829a0e7$var$_defineProperty(this, "modalId", void 0);
        $3753ea3bc829a0e7$var$_defineProperty(this, "zIndex", 205);
    }
    $3753ea3bc829a0e7$var$_createClass(ModalService, [
        {
            key: "open",
            value: function open(ConstructorClass, conf) {
                this.instance = new ConstructorClass(conf, {
                    closeAll: this.closeAll.bind(this)
                });
                if (!this.instance.domElement) return;
                this.originalModal = conf.originalModal;
                this.modalId = conf === null || conf === void 0 ? void 0 : conf.modalId;
                this.chooseSetupForModal(this.instance);
                ModalService.switchFocusToWindow(this.instance.domElement);
                return this.instance;
            }
        },
        {
            key: "close",
            value: function close(instanceDomElement, returnData) {
                var modalContent = instanceDomElement.querySelector(".o-modal-window");
                var originalModal = !!instanceDomElement.getAttribute("listeners-attached");
                this.removeInstanceFromModalStack();
                this.decreaseZIndex(instanceDomElement);
                if (originalModal) {
                    instanceDomElement.classList.remove("o-modal-wrapper--active");
                    modalContent.classList.remove("o-modal-window", "o-modal-window--fixed");
                } else instanceDomElement.remove();
                 // bodyScrollService.enableBodyScroll();
                ModalService.emitCloseEvent(instanceDomElement); // this.closePromise.resolve(returnData);
            }
        },
        {
            key: "closeAll",
            value: /**
     * Close all opened modals
     */ function closeAll() {
                var _this = this;
                var stackCopy = $3753ea3bc829a0e7$var$_toConsumableArray(this.modalStack);
                stackCopy.forEach(function(domEl) {
                    _this.close(domEl);
                });
            }
        },
        {
            key: "chooseSetupForModal",
            value: function chooseSetupForModal(instance) {
                var clonedModalDomElement = ModalService.cloneModal(instance.domElement);
                var originalModalDomElement = instance.domElement;
                this.originalModal ? this.setModal(originalModalDomElement) : this.setModal(clonedModalDomElement);
            }
        },
        {
            key: "setModal",
            value: function setModal(instanceDomElement) {
                var areListenersAttached = !!instanceDomElement.getAttribute("listeners-attached");
                this.decorateModalDOMObject(instanceDomElement);
                document.body.appendChild(instanceDomElement);
                this.modalStack.push(instanceDomElement);
                if (this.originalModal && areListenersAttached) return;
                this.attachInnerListeners(instanceDomElement);
                this.setCustomAttributes(instanceDomElement);
                this.handleBackgroundClick(instanceDomElement);
                this.handleEscKeyPress();
            }
        },
        {
            key: "attachInnerListeners",
            value: function attachInnerListeners(instanceDomElement) {
                this.instance.listeners(instanceDomElement);
            }
        },
        {
            key: "setCustomAttributes",
            value: function setCustomAttributes(instanceDomElement) {
                if (this.originalModal) instanceDomElement.setAttribute("listeners-attached", "true");
                else {
                    instanceDomElement.setAttribute("modal-cloned", "true");
                    this.modalId && instanceDomElement.setAttribute("modal-id", this.modalId);
                }
            }
        },
        {
            key: "handleBackgroundClick",
            value: /**
     * Close last opened modal
     * @param instanceDomElement
     */ function handleBackgroundClick(instanceDomElement) {
                var _this2 = this;
                var isNotCloseable = instanceDomElement.dataset.isNotCloseable === "true";
                instanceDomElement.addEventListener("mousedown", function(e) {
                    if (e.target !== e.currentTarget || isNotCloseable) return;
                    _this2.close(instanceDomElement);
                });
            }
        },
        {
            key: "handleEscKeyPress",
            value: function handleEscKeyPress() {
                var _this3 = this;
                var isKeyUpListenerAttached = !!document.body.getAttribute("modal-listener"); // Check if listener is already attached to body or if more than one modal is opened
                if (isKeyUpListenerAttached || this.modalStack.length > 1) return;
                document.body.addEventListener("keyup", function(e) {
                    document.body.setAttribute("modal-listener", "true");
                    if (_this3.modalStack.length && (e.key === "Escape" || e.key === "Esc")) {
                        var lastOpenedModal = _this3.modalStack.slice(-1)[0];
                        _this3.close(lastOpenedModal);
                    }
                });
            }
        },
        {
            key: "removeInstanceFromModalStack",
            value: function removeInstanceFromModalStack() {
                this.modalStack.splice(this.modalStack.indexOf(this.instance), 1);
            }
        },
        {
            key: "decorateModalDOMObject",
            value: function decorateModalDOMObject(instanceDomElement) {
                var modalContent = instanceDomElement.firstElementChild;
                var modalWrapperClass = instanceDomElement.classList[0];
                modalContent.classList.add("o-modal-window");
                instanceDomElement.classList.add("".concat(modalWrapperClass, "--active")); // bodyScrollService.disableBodyScroll();
                this.increaseZIndex(instanceDomElement);
                ModalService.handleModalHeightChange(modalContent);
            }
        },
        {
            key: "increaseZIndex",
            value: function increaseZIndex(instanceDomElement) {
                this.zIndex += 1;
                instanceDomElement.style.zIndex = this.zIndex;
                return instanceDomElement.style.zIndex;
            }
        },
        {
            key: "decreaseZIndex",
            value: function decreaseZIndex(instanceDomElement) {
                this.zIndex -= 1;
                instanceDomElement.removeAttribute("style");
            }
        }
    ], [
        {
            key: "emitCloseEvent",
            value: function emitCloseEvent(instanceDomElement) {
                var modalCLoseEvent = new CustomEvent("modalClosed", {
                    detail: instanceDomElement
                });
                document.dispatchEvent(modalCLoseEvent);
            }
        },
        {
            key: "cloneModal",
            value: function cloneModal(instanceDomElement) {
                return instanceDomElement.cloneNode(true);
            }
        },
        {
            key: "switchFocusToWindow",
            value: function switchFocusToWindow(instanceDomElement) {
                var element = instanceDomElement.querySelector("button") ? instanceDomElement.querySelector("button") : undefined;
                if (element) element.focus();
            }
        },
        {
            key: "handleModalHeightChange",
            value: function handleModalHeightChange(modalContent) {
                // create observer for DOM changes in modal
                var mutObs = new MutationObserver(function(mutations) {
                    mutations.forEach(function() {
                        return ModalService.setModalPosition(modalContent);
                    });
                }); // start observing modal
                mutObs.observe(modalContent, {
                    attributes: true,
                    characterData: true,
                    childList: true,
                    subtree: true,
                    attributeOldValue: true,
                    characterDataOldValue: true
                });
            }
        },
        {
            key: "setModalPosition",
            value: function setModalPosition(modalContent) {
                // check if already has a class to avoid infinite loop with MutationObserver
                if (modalContent.clientHeight >= window.innerHeight && !modalContent.classList.contains("o-modal-window--fixed")) modalContent.classList.add("o-modal-window--fixed");
                else if (modalContent.clientHeight < window.innerHeight && modalContent.classList.contains("o-modal-window--fixed")) modalContent.classList.remove("o-modal-window--fixed");
            }
        }
    ]);
    return ModalService;
}();
var $3753ea3bc829a0e7$export$aa79c38c7c614f4c = new $3753ea3bc829a0e7$export$de3e1d2ea3b4fd9b();



function $960004e962b6e5a8$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $960004e962b6e5a8$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $960004e962b6e5a8$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $960004e962b6e5a8$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $960004e962b6e5a8$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function $960004e962b6e5a8$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
var $960004e962b6e5a8$export$71f8acffe495dae3 = /*#__PURE__*/ function() {
    function PhotoModal(options) {
        $960004e962b6e5a8$var$_classCallCheck(this, PhotoModal);
        $960004e962b6e5a8$var$_defineProperty(this, "modalContext", "image-modal");
        $960004e962b6e5a8$var$_defineProperty(this, "modalImage", void 0);
        $960004e962b6e5a8$var$_defineProperty(this, "modalWrapper", void 0);
        $960004e962b6e5a8$var$_defineProperty(this, "currentTarget", void 0);
        $960004e962b6e5a8$var$_defineProperty(this, "domElement", void 0);
        this.createPhotoModal();
        this.domElement = document.querySelector("[modal-context=".concat(this.modalContext, "]"));
        this.modalImage = document.querySelector(".js-modal__image");
        this.currentTarget = options.currentTarget;
        this.appendToModal();
    }
    $960004e962b6e5a8$var$_createClass(PhotoModal, [
        {
            key: "listeners",
            value: function listeners(instanceDomElement) {
                var _this = this;
                var closeBtn = instanceDomElement.querySelector(".js-modal-close-btn");
                closeBtn.addEventListener("click", function() {
                    (0, $3753ea3bc829a0e7$export$aa79c38c7c614f4c).close(instanceDomElement);
                    _this.removeModalFromDom();
                });
                document.addEventListener("modalClosed", function() {
                    _this.removeModalFromDom();
                });
            }
        },
        {
            key: "createPhotoModal",
            value: function createPhotoModal() {
                var modalWrapper = this.createModalWrapper();
                var modalContainer = this.createModalContainer();
                var modalHeader = this.createModalHeader();
                var modalContent = this.createModalContent();
                var modalFooter = this.createModalFooter();
                modalContainer.appendChild(modalHeader);
                modalContainer.appendChild(modalContent);
                modalContainer.appendChild(modalFooter);
                modalWrapper.appendChild(modalContainer);
                document.body.appendChild(modalWrapper);
                this.modalWrapper = modalWrapper;
            }
        },
        {
            key: "createModalWrapper",
            value: function createModalWrapper() {
                var modalWrapper = document.createElement("div");
                modalWrapper.classList.add("o-modal-wrapper", "js-modal-wrapper");
                modalWrapper.setAttribute("role", "dialog");
                modalWrapper.setAttribute("modal-context", "image-modal");
                return modalWrapper;
            }
        },
        {
            key: "createModalContainer",
            value: function createModalContainer() {
                var modalContainer = document.createElement("section");
                modalContainer.classList.add("o-modal__container");
                return modalContainer;
            }
        },
        {
            key: "createModalHeader",
            value: function createModalHeader() {
                var modalHeaderContainer = document.createElement("div");
                var modalHeaderTitle = document.createElement("div");
                var svg = document.createElement("svg");
                svg.innerHTML = this.getSvgClosElement();
                modalHeaderContainer.classList.add("o-modal__header");
                modalHeaderTitle.classList.add("js-modal__title");
                svg.classList.add("js-modal-close-btn", "o-modal-close");
                modalHeaderContainer.appendChild(modalHeaderTitle);
                modalHeaderContainer.appendChild(svg);
                return modalHeaderContainer;
            }
        },
        {
            key: "createModalContent",
            value: function createModalContent() {
                var modalContent = document.createElement("div");
                var modalContentImage = document.createElement("img");
                modalContent.classList.add("c-image-modal__container", "o-modal__content");
                modalContentImage.classList.add("c-image-modal__image", "js-modal__image");
                modalContent.appendChild(modalContentImage);
                return modalContent;
            }
        },
        {
            key: "createModalFooter",
            value: function createModalFooter() {
                var modalFooterContainer = document.createElement("div");
                var modalDescription = document.createElement("div");
                modalFooterContainer.classList.add("o-modal__footer");
                modalDescription.classList.add("js-modal__description");
                modalFooterContainer.appendChild(modalDescription);
                return modalFooterContainer;
            }
        },
        {
            key: "appendToModal",
            value: function appendToModal() {
                this.appendImage();
                this.appendTitle();
                this.appendDescription();
            }
        },
        {
            key: "appendImage",
            value: function appendImage() {
                this.modalImage.src = this.currentTarget.href || "";
                this.modalImage.alt = this.currentTarget.textContent || "";
            }
        },
        {
            key: "appendTitle",
            value: function appendTitle() {
                var title = this.currentTarget.dataset.title;
                if (title) {
                    var modalTitleElement = this.domElement.querySelector(".js-modal__title");
                    modalTitleElement.textContent = title;
                    modalTitleElement.classList.add("o-modal__title");
                }
            }
        },
        {
            key: "appendDescription",
            value: function appendDescription() {
                var description = this.currentTarget.dataset.description;
                if (description) {
                    var modalDescriptionElement = this.domElement.querySelector(".js-modal__description");
                    modalDescriptionElement.textContent = description;
                    modalDescriptionElement.classList.add("o-modal__description");
                }
            }
        },
        {
            key: "removeModalFromDom",
            value: function removeModalFromDom() {
                var modalWrapper = document.querySelector(".js-modal-wrapper");
                modalWrapper && document.body.removeChild(modalWrapper);
            }
        },
        {
            key: "getSvgClosElement",
            value: function getSvgClosElement() {
                return '\n            <svg xmlns="http://www.w3.org/2000/svg" fill="#90969B" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">\n                <g>\n                    <g>\n                        <path d="M25,0C25,0,25,0,25,0C11.3,0,0.1,11.2,0,25c0,13.8,11.2,25,25,25H25c6.6,0,12.8-2.6,17.6-7.3C47.4,38,50,31.8,50,25\n                            C50,11.3,38.7,0,25,0z M25,47.1C25,47.1,25,47.1,25,47.1c-6,0-11.5-2.3-15.7-6.5S2.9,30.9,2.9,25c0-6,2.3-11.5,6.5-15.7\n                            C13.6,5.2,19,3,24.9,3H25c12.2,0.1,22.1,10,22,22.1C47,37.2,37.2,47.1,25,47.1z"/>\n                        <path d="M33.4,31.3c-0.9-0.9-2-2-2.9-2.9l-3.3-3.3l0.4-0.5c0.1-0.1,0.2-0.3,0.4-0.4l5.4-5.4c0.7-0.7,0.7-1.6,0.1-2.2\n                            c-0.6-0.6-1.4-0.6-2.1,0.2l-5.5,5.5c-0.1,0.1-0.2,0.2-0.4,0.3L25,23.1l-0.4-0.6c-0.1-0.1-0.2-0.3-0.3-0.4l-2.2-2.2\n                            c-1-1-2-2-3.1-3.1c-0.4-0.4-0.7-0.6-1.2-0.6c-0.1,0-0.1,0-0.2,0c-0.7,0.1-1,0.4-1.2,0.9c-0.2,0.6-0.1,1,0.5,1.6\n                            c1.5,1.5,3.1,3,4.7,4.6l1.7,1.7l-1.8,1.7c-1.6,1.6-3.1,3.1-4.6,4.6c-0.3,0.3-0.5,0.6-0.5,0.9c-0.1,0.6,0.2,1.2,0.8,1.5\n                            c0.6,0.3,1.2,0.2,1.7-0.3c1.2-1.2,2.4-2.4,3.7-3.7l1.9-1.9c0.1-0.1,0.2-0.2,0.4-0.3l0.4-0.4l0.4,0.4c0.1,0.1,0.2,0.2,0.4,0.3\n                            l5.2,5.2c0.1,0.1,0.2,0.2,0.3,0.3c0.7,0.7,1.5,0.7,2.1,0.1C34.2,32.8,34.1,31.8,33.4,31.3z"/>\n                    </g>\n                </g>\n\n            </svg>\n        ';
            }
        }
    ]);
    return PhotoModal;
}();


document.querySelectorAll(".js-frame__image").forEach(function(image) {
    image.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        (0, $3753ea3bc829a0e7$export$aa79c38c7c614f4c).open((0, $960004e962b6e5a8$export$71f8acffe495dae3), {
            currentTarget: e.currentTarget,
            originalModal: true
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var hasBigTable = false;
    var screenHeight = window.innerHeight;
    var tables = document.querySelectorAll(".o-table");
    tables.forEach(function(table) {
        var tableWidth = table.clientWidth;
        var tableHeight = table.clientHeight;
        var hasTableContainerParent = table.parentElement.classList.contains("o-table__container");
        var parentElementWidth = table.parentElement.clientWidth;
        if (hasTableContainerParent && tableWidth > parentElementWidth && tableHeight > screenHeight) hasBigTable = true;
    });
    hasBigTable && $69d911adb1b7eeb1$var$setFullBody();
});
var $69d911adb1b7eeb1$var$setFullBody = function setFullBody() {
    document.body.classList.add("o-frame-body--full");
};


//# sourceMappingURL=index.js.map
