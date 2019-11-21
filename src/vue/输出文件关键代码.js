window.render = function render() {
  return _c("div", {
    "attrs": {
      "id": "app"
    },
    "ref": "app"
  }, [_t("\n    "), _c("div", {
    "attrs": {}
  }, [_t("\n      "), _c("input", {
    "attrs": {
      "type": "text",
      "class": "input",
      "placeholder": "请输入",
      "value": "李鑫"
    }
  }, []), _t("\n      "), _c("label", {
    "attrs": {}
  }, [_t("我们的祖国")]), _t("\n      "), _c("ul", {
    "attrs": {
      "class": "ul"
    }
  }, [_t("\n        "), _l([1, 2, 3, 4, 5, 6], function (item, index) {
    return _c("li", {
      "attrs": {
        "class": "li",
        ":key": "index"
      },
      "v-for": {
        "itemName": "(item, index)",
        "methods": "in",
        "listName": "[1, 2, 3, 4, 5, 6]"
      }
    }, [_t("\n          "), _c("div", {
      "attrs": {
        "class": "item"
      }
    }, [_t("第{{index}}项： {{item}}")]), _t("\n        ")])
  }), _t("\n      ")]), _t("\n    ")]), _t("\n  ")])
};
