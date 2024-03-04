'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener('alpine:init', function () {
    Alpine.data('ndexplorer', function () {
        return {
            _setting: {
                baseUrl: "/filemanager/getalldir",
                ajaxParam: {
                    cmd: '',
                    value: '',
                    secondaryValue: ''
                }
            },

            _folderTree: [{
                level: 1,
                fullpath: '',
                folderName: '',
                isShow: true,
                cssClass: {}
            }],

            init: function init() {
                var _this = this;

                fetch(this._setting.baseUrl).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    console.log(json);
                    _this._folderTree = json.map(function (path) {
                        var _cssClass;

                        // tách chuỗi thành mảng dựa theo dấu \
                        var tmpArr = path.split("\\");
                        return {
                            fodelName: tmpArr[tmpArr.length - 1], // phần tử cuối
                            fullpath: path,
                            level: tmpArr.length,
                            isShow: false,
                            cssClass: (_cssClass = {}, _defineProperty(_cssClass, 'folder-level-${tmArr.length}', true), _defineProperty(_cssClass, 'show', false), _cssClass)
                        };
                    });
                    console.log(_this._folderTree);
                });
            }
        };
    });
});

