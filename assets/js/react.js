'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var data = [];

/* 장바구니 담기 버튼 */
function CartButton(props) {
    var addCount = function addCount() {
        props.onCountChange();
        console.log('버튼 클릭');
    };

    // return (
    //     <button className="btn btn-default btn-xs btn-cart" data-count={props.count} onClick={addCount}>
    //         <i className="fa fa-shopping-cart"/>
    //     </button>
    // )

    if (props.count) {
        return React.createElement(
            'button',
            { className: 'btn btn-default btn-xs btn-cart', onClick: addCount },
            props.count
        );
    } else {
        return React.createElement(
            'button',
            { className: 'btn btn-default btn-xs btn-cart', onClick: addCount },
            React.createElement('i', { className: 'fa fa-shopping-cart' })
        );
    }
}

/* 앨범 */
function Album(props) {
    // const [count, setCount] = useState(0)

    var countChange = function countChange() {
        props.onUpdate(props.i);
        console.log(props.i);
    };

    return React.createElement(
        'div',
        { className: 'col-md-2 col-sm-2 col-xs-2 product-grid album', 'data-category': props.e.category,
            'data-name': props.e.albumName, 'data-idx': props.i + 1 },
        React.createElement(
            'div',
            { className: 'product-items' },
            React.createElement(
                'div',
                { className: 'project-eff' },
                React.createElement('img', { className: 'img-responsive', src: '/images/' + props.e.albumJaketImage, alt: props.e.albumName })
            ),
            React.createElement(
                'div',
                { className: 'produ-cost' },
                React.createElement(
                    'h5',
                    null,
                    props.e.albumName
                ),
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'i',
                        { className: 'fa fa-microphone' },
                        ' \uC544\uD2F0\uC2A4\uD2B8'
                    ),
                    React.createElement(
                        'p',
                        { className: 'artist' },
                        props.e.artist
                    )
                ),
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'i',
                        { className: 'fa fa-calendar' },
                        ' \uBC1C\uB9E4\uC77C'
                    ),
                    React.createElement(
                        'p',
                        null,
                        props.e.release
                    )
                ),
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'i',
                        { className: 'fa fa-money' },
                        ' \uAC00\uACA9'
                    ),
                    React.createElement(
                        'p',
                        null,
                        '\uFFE6',
                        props.e.price.toLocaleString()
                    )
                ),
                React.createElement(CartButton, { onCountChange: countChange, count: props.e.count })
            )
        )
    );
}

/* 앨범 목록 */

var AlbumList = function (_React$Component) {
    _inherits(AlbumList, _React$Component);

    function AlbumList(props) {
        _classCallCheck(this, AlbumList);

        var _this = _possibleConstructorReturn(this, (AlbumList.__proto__ || Object.getPrototypeOf(AlbumList)).call(this, props));

        _this.state = {
            data: [],
            menus: []
        };

        _this.changeCountData = _this.changeCountData.bind(_this);
        return _this;
    }

    _createClass(AlbumList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            fetch('/music_data.json').then(function (res) {
                return res.json();
            }).then(function (json) {
                json.data.sort(function (a, b) {
                    return a.release > b.release ? -1 : 1;
                });

                _this2.setState({ data: json.data });

                var menuArr = ['발라드'];
                var menus = '';
                var items = '';

                /* json 데이터를 돌아가면서 보여주기 */
                json.data.filter(function (e, i) {
                    if ($.inArray(e.category, menuArr) === -1) {
                        menuArr.push(e.category);
                        menus += ' <li>\n                        <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>' + e.category + '</span></a>\n                    </li>';
                    }

                    items += '<tr data-idx="' + (i + 1) + '" style="display: none;">\n                                            <td class="albuminfo">\n                                                <img src="/images/' + e.albumJaketImage + '">\n                                                <div class="info">\n                                                    <h4>' + e.albumName + '</h4>\n                                                    <span>\n                                                        <i class="fa fa-microphone"> \uC544\uD2F0\uC2A4\uD2B8</i> \n                                                        <p>' + e.artist + '</p>\n                                                    </span>\n                                                    <span>\n                                                        <i class="fa  fa-calendar"> \uBC1C\uB9E4\uC77C</i> \n                                                        <p>' + e.release + '</p>\n                                                    </span>\n                                                </div>\n                                            </td>\n                                            <td class="albumprice">\n                                                \uFFE6 ' + num(e.price).toLocaleString() + '\n                                            </td>\n                                            <td class="albumqty">\n                                                <input type="number" class="form-control" min="1" value="0">\n                                            </td>\n                                            <td class="pricesum">\n                                                \uFFE6 0\n                                            </td>\n                                            <td>\n                                                <button class="btn btn-default">\n                                                    <i class="fa fa-trash-o"></i> \uC0AD\uC81C\n                                                </button>\n                                            </td>\n                                        </tr>';

                    /* 갯수 정보 추가 */
                    _this2.state.data[i].count = 0;
                });

                $('.nav').append(menus);

                /* 아이템 목록 추가 */
                $('.modal tbody').html(items);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'changeCountData',
        value: function changeCountData(i) {
            console.log(this.state);
            var newData = this.state.data;
            newData[i].count = newData[i].count + 1;

            this.setState({ data: newData });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            console.log(this.state.data);

            /* 저거 할 때 중괄호 넣으면 안됀다... 중괄호 안넣어서 2시간 동안 고민함;;; */
            var list = this.state.data.map(function (e, i) {
                return React.createElement(Album, { onUpdate: _this3.changeCountData, key: i, e: e, i: i });
            });

            console.log(list);

            // 발매일 내림차순
            return React.createElement(
                'div',
                null,
                list
            );
        }
    }]);

    return AlbumList;
}(React.Component);

// function AlbumData(props) {
//     return (
//         <span>
//             <i className="fa fa-money"> 가격</i>
//             <p>￦{props.e.price.toLocaleString()}</p>
//         </span>
//     )
// }


/* 비동기적으로 데이터 처리 */


fetch('/music_data.json').then(function (res) {
    return res.json();
}).then(function (json) {
    json.data.sort(function (a, b) {
        return a.release > b.release ? -1 : 1;
    });

    data = json.data;

    var domContainer = document.querySelector('.contents');
    ReactDOM.render(e(AlbumList), domContainer);
});