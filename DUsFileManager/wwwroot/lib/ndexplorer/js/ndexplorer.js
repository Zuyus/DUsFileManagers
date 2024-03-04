document.addEventListener('alpine:init', () => {
    Alpine.data('ndexplorer', () => ({
        _setting: {
            baseUrl: '/ndexplorer',
            ajaxParam: {
                cmd: '',
                value: '',
                secondaryValue: '',
            },
            setParams(cmd, value = '', secondaryValue = '') {
                this.ajaxParam.cmd = cmd;
                this.ajaxParam.value = value;
                this.ajaxParam.secondaryValue = secondaryValue;
            },
            getUrl() {
                return `${this.baseUrl}?${new URLSearchParams(this.ajaxParam)}`;
            },
        },
        

        _folderTree: [
            {
                level: 1,
                fullPath: '',
                folderName: '',
                isOpen: true,
                cssClass: {}
            }
        ],

        init() {
            
            this._setting.setParams("GET_ALL_DIR");
            fetch(this._setting.getUrl())
                .then(res => res.json())
                .then(json => {
                    this._folderTree = json.data.map(path => {
                        // tách chuỗi thành mảng dựa theo dấu \
                        var tmpArr = path.split("\\");
                        return {
                            folderName: tmpArr[tmpArr.length - 1], // phần tử cuối
                            fullPath: path,
                            level: tmpArr.length,
                            isOpen: false,
                            cssClass: {
                                [`folder-level-${tmpArr.length}`]: true,
                                show: false
                            }
                        }
                    });
                });
        },

        toggleFolder(idx) {
            this.$el.innerText = '-';

            // Hiển thị những thư mực có level lớn hơn level hiện tại 1 đơn vị
            if (idx >= this._folderTree.length) {
                return;
            }

            this._folderTree[idx].isOpen = !this._folderTree[idx].isOpen;
            var currentLevel = this._folderTree[idx].level;
            this.openFolder(idx, currentLevel);

            /*      hiển thị thư mục con 
 
             var currentLevel = this._folderTree[idx].level;
             var isOpen = this._folderTree[idx].isOpen;
             this.$el.innerText = isOpen ? '-' : '+';
 
 
             while (idx + 1 < this._folderTree.length && this._folderTree[idx + 1].level > currentLevel) {
                 if (this._folderTree[idx + 1].level == currentLevel + 1) {
                     this._folderTree[idx + 1].cssClass.show = isOpen;
                 }
                 idx++;*/
        },
        openFolder(idx, maxLevel) {
            var isOpen = this._folderTree[idx].isOpen;

            if (isOpen) {
                // Mở thư mục
                while (idx + 1 < this._folderTree.length && this._folderTree[idx + 1].level > maxLevel) {
                    if (maxLevel + 1 == this._folderTree[idx + 1].level) {
                        this._folderTree[idx + 1].cssClass.show = true;
                        if (this._folderTree[idx + 1].isOpen) {
                            // Đệ quy
                            this.openFolder(idx + 1, this._folderTree[idx + 1].level);
                        }
                    }
                    idx++;
                }
            } else {
                while (idx + 1 < this._folderTree.length && this._folderTree[idx + 1].level > maxLevel) {
                    this._folderTree[idx + 1].cssClass.show = false;
                    idx++;
                }
            }
        }
    

    }));
});