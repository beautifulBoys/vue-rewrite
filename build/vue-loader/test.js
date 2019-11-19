function render () {
  return _c("div", {"id": "app","ref": "app"}, [
    _t("\n    "), 
    _c("div", {}, [
      _t("\n      "), 
      _c("input", {"type": "text"}, []), 
      _t("\n      "), 
      _c("label", {}, [_t("我们的祖国")]), 
      _t("\n      "), 
      _c("ul", {"class": "ul"}, [
        _t("\n        "),
        _l([1, 2, 3, 4, 45, 6], function (item, index) {
          return (
            _c("li", {"class": "li"}, [
              _t("\n          "), 
              _c("div", {"class": "item"}, [
                _t("第" + index + "项：" + item + "")
              ]), 
              _t("\n        ")
            ])
          )
        }),
        _t("\n      ")
      ]), 
      _t("\n    ")
    ]), 
    _t("\n  ")
  ])
}

function render() {
  return _c("div", {
    "attrs": {
      "id": "box"
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
  }, [_t("\n        "), _c("li", {
    "attrs": {
      "class": "li"
    },
    "v-for": {
      "itemName": "(item, index)",
      "methods": "in",
      "listName": "[1, 2, 3, 4, 45, 6]"
    }
  }, [_t("\n          "), _c("div", {
    "attrs": {
      "class": "item"
    }
  }, [_t("第\"+index+\"项： \"+item+\"")]), _t("\n        ")]), _t("\n      ")]), _t("\n    ")]), _t("\n  ")])
}
