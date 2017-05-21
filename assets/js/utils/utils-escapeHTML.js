let escapeHTML = function (html, isUnescape){
        let str = html;
        //要添加转义的写在这里，&必须在第一位
        let escapeList = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": "&apos;",
            ' ': '&nbsp',
        }
        function _replaceAll(string, oldChar, newChar) {
            let re = new RegExp(oldChar, 'g');
            return string.replace(re, newChar);
        }
        function _escapeHTML() {
            for (let i in escapeList) {
                //str = str.replace(new RegExp(i, 'g'), escapeList[i]);
                str = _replaceAll(str, i, escapeList[i]);
            }
            return str;
        }

        function _unescapeHTML() {
            for (let i in escapeList) {
                //str = str.replace(new RegExp(escapeList[i], 'g'), i);
                str = _replaceAll(str, escapeList[i], i);
            }
            return str;
        }
        if (!!isUnescape) {
            return _unescapeHTML();
        } else {
            return _escapeHTML();
        }
    }

   module.exports = escapeHTML;