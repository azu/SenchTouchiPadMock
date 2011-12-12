/**
 * Created by azu.
 * Date: 11/10/20 12:43
 * License: MIT License
 */

App.views.view = Ext.extend(Ext.form.FormPanel, {
    fullscreen:true,
    layout:'card',
    cls:"app-view",
    initComponent:function() {
        var that = this;
        Ext.regModel('lists', {
            fields:['title']
        });

        var data = [
            {
                title:"年齢",
                instructions:"あなたの年齢を入力してください",
                xtype:'fieldset',
                id:'yearsold',
                items:[
                    {
                        xtype:"textfield",
                        inputType:"number",
                        name:'yearsold',
                        label:'年齢',
                        placeholder:"年齢を入力"
                    }
                ]
            },
            {
                title:"一日に吸うタバコの本数",
                instructions:"一日にタバコを吸う本数(禁煙中ならば、以前は何本くらいすっていましたか?)<br />" +
                        "今まで、合計で何年間くらいタバコを吸っていましたか?",
                xtype:'fieldset',
                id:'cigarettes',
                items:[
                    {
                        xtype:"textfield",
                        inputType:"number",
                        label:"一日の喫煙本数",
                        name:"cigarettesPerDay"
                    },
                    {
                        xtype:"textfield",
                        inputType:"number",
                        label:"喫煙年数",
                        name:"yearsOfSmoking"
                    }
                ]
            },
            {
                title:"体重・身長",
                instructions:"あなたの体重と身長を入力してください",
                xtype:'fieldset',
                items:[
                    {
                        xtype:"textfield",
                        inputType:"number",
                        label:"体重",
                        name:"bodyWeight",
                        placeHolder:"体重を入力"
                    },
                    {
                        xtype:"textfield",
                        inputType:"number",
                        label:"身長",
                        name:"bodyHeight",
                        placeHolder:"身長を入力"
                    }
                ]
            },
            {
                title:"チェックシート",
                instructions:"それぞれの項目に対して該当するものをチェックしてください",
                xtype:'container',
                cls:'checksheet', // heightがたりないので無理やり100%に
                id:'checksheet',
                scroll:'vertical',
                items:[
                    // それぞれの問題
                    {
                        title:"天候により、せきがひどくなることがありますか？",
                        xtype:'fieldset',
                        defaultType:"radiofield",
                        items:[
                            {
                                name:'tmp_seki',
                                label:'はい(天候によりひどくなる)',
                                value:'3'
                            },
                            {
                                name:'tmp_seki',
                                label:'いいえ(天候は関係ない)',
                                value:'0'
                            },
                            {
                                name:'tmp_seki',
                                label:"せきは出ない",
                                value:'0'
                            }
                        ]
                    },
                    {
                        title:"風邪をひいていないのにたんが絡むことがありますか?",
                        xtype:'fieldset',
                        defaultType:"radiofield",
                        items:[
                            {
                                name:'kaze_tan',
                                label:'はい',
                                value:'3'
                            },
                            {
                                name:'kaze_tan',
                                label:'いいえ',
                                value:'0'
                            }
                        ]
                    },
                    {
                        title:"朝起きてすぐにたんがカラムことがよくありますか?",
                        xtype:'fieldset',
                        defaultType:"radiofield",
                        items:[
                            {
                                name:'tan_karamu',
                                label:'はい',
                                value:'0'
                            },
                            {
                                name:'tan_karamu',
                                label:'いいえ',
                                value:'3'
                            }
                        ]
                    },
                    {
                        title:"喘鳴(ゼイゼイ、ヒューヒュー)がよくありますか?",
                        xtype:'fieldset',
                        defaultType:"radiofield",
                        items:[
                            {
                                name:'zenmei',
                                label:'いいえ、ありません',
                                value:'0'
                            },
                            {
                                name:'zenmei',
                                label:'時々、もしくはよくある',
                                value:'4'
                            }
                        ]
                    },

                    {
                        title:"今現在(もしくは今まで)アレルギーの症状はありますか?",
                        xtype:'fieldset',
                        defaultType:"radiofield",
                        items:[
                            {
                                name:'allergy',
                                label:'はい',
                                value:'0'
                            },
                            {
                                name:'allergy',
                                label:'いいえ',
                                value:'3'
                            }
                        ]
                    },


                ]
            }
        ];
        var store = new Ext.data.JsonStore({
            model:'lists',
            data:data,
            autoLoad:true
        });

        var bottomDock = {
            xtype:'toolbar',
            dock:'bottom',
            // ツールバーの高さを変える
            height:Ext.is.Phone ? 44 : 88,
            layoutConfig:{
                align:'stretch'
            },
            defaults:{
                flex:1
            },
            items:[
                {
                    ui:'back',
                    id:'back-card',
                    text:'前へ',
                    cls:'navigation-button',
                    handler:function() {
                        var currentItemIdx = myPanel.items.indexOf(myPanel.getActiveItem());
                        slideToItem(myPanel, currentItemIdx - 1);
                    }
                },
                {
                    xtype:'spacer'
                },
                {
                    ui:'next',
                    id:'next-card',
                    text:'次へ',
                    cls:'navigation-button',
                    handler:function() {
                        var currentItemIdx = myPanel.items.indexOf(myPanel.getActiveItem());
                        slideToItem(myPanel, currentItemIdx + 1);
                    }
                },
            ]
        };

        var myPanel = Ext.apply(this, {
            items:data,
            dockedItems:[
                bottomDock
                // leftDock
            ]
        });


        // ナビゲーション
        this.navigationButton = new Ext.Button({
            hidden:Ext.is.Phone || Ext.Viewport.orientation == 'landscape',
            text:'目次',
            handler:function() {
                this.onNavButtonTap();
            },
            scope:this
        });

        this.backButton = new Ext.Button({
            text:this.backText,
            ui:'back',
            handler:this.onUiBack,
            hidden:true,
            scope:this
        });
        // フォントサイズを変更
        var fontSlider = new Ext.form.Slider({
            value:100,
            minValue:50,
            maxValue:250,
            floating:true,
            bodyStyle:'padding: 10px; background-color: #FCC;',
            listeners:{
                change:function changeFontSize() {
                    console.log("font size", fontSlider.getValue());
                    //                    var appView = Ext.DomQuery.selectNode(".x-form-fieldset");
                    addCSS(document, ".x-form-fieldset{ font-size:" + parseInt(fontSlider.getValue(), 10) + "%;}");
                }
            }
        });
        fontSlider.enableBubble("change");

        this.settingButton = new Ext.Button(
                {
                    ui:'action',
                    text:'Setting',
                    handler:function() {
                        console.log(fontSlider);
                        fontSlider.showBy(that.settingButton, "fade");
                    },
                    scope:this
                });
        this.confirmButton = new Ext.Button({
            ui:'confirm',
            id:'confirm-button',
            text:'記入完了',
            disabled:true,
            handler:function() {
                var calcCOPD = {};
                calcCOPD.yearsold = function(yearsold) {
                    var points = 0;
                    if (yearsold <= 49) {
                        points = 0;
                    } else if (50 <= yearsold && yearsold <= 59) {
                        points = 4;
                    } else if (60 <= yearsold && yearsold <= 69) {
                        points = 8;
                    } else if (70 <= yearsold) {
                        points = 10;
                    }
                    return points;
                }
                calcCOPD.cigarette = function(cigarettes, years) {
                    var points = 0;
                    // 一日の喫煙箱数 = 一日のタバコ数 / 20本 ( 1箱入数 )
                    // 求めるのは 1日の喫煙箱数 * 喫煙年数 = n pacl・year
                    var cigarettesPerDay = cigarettes / 20;
                    var packYear = cigarettesPerDay * years;
                    if (0 <= packYear && packYear <= 14) {
                        points = 0;
                    } else if (15 <= packYear && packYear <= 24) {
                        points = 2;
                    } else if (25 <= packYear && packYear <= 49) {
                        points = 3;
                    } else if (50 <= packYear) {
                        points = 7;
                    }
                    return points;
                }

                calcCOPD.BMI = function(weight, height) {
                    var points = 0;
                    // BMI = 体重/身長
                    var bmiValue = weight / (height / 100);
                    if (bmiValue < 25.4) {
                        points = 5;
                    } else if (25.4 <= bmiValue && bmiValue <= 29.7) {
                        points = 1;
                    } else if (29.7 < bmiValue) {
                        points = 0;
                    }
                    return points;
                }
                var formFields = that.getFields();
                var formValues = that.getValues();
                var questions = (function() {
                    var questions = [];
                    questions[questions.length] = calcCOPD.yearsold(formValues['yearsold']);
                    questions[questions.length] = calcCOPD.cigarette(formValues['cigarettesPerDay'], formValues['yearsOfSmoking']);
                    questions[questions.length] = calcCOPD.BMI(formValues['bodyWeight'], formValues['bodyHeight']);
                    questions.push(formValues['tmp_seki']);
                    questions.push(formValues['kaze_tan']);
                    questions.push(formValues['tan_karamu']);
                    questions.push(formValues['zenmei']);
                    questions.push(formValues['allergy']);
                    return questions;
                })();
                var totalPoints = 0;
                for (var i = 0, len = questions.length; i < len; i++) {
                    var question = questions[i];
                    var point = parseInt(question, 10);
                    totalPoints += point;
                }
                if (isNaN(totalPoints)) {
                    alert("入力ミスがあります。");
                    return;
                }
                console.log(questions, totalPoints);


                /*
                 // チェックシート以下をフラットにおいてチェックシートじたいは削除
                 var dataLength = data.length - 1;
                 var flatAry = data.concat(data[dataLength].items);
                 flatAry.splice(dataLength, 1);
                 console.log(flatAry);
                 var storeFlat = new Ext.data.JsonStore({
                 model:'lists',
                 data:flatAry,
                 autoLoad:true
                 });
                 var t = new Ext.Template('<div style="text-align: left;float: left">{title}</div>\
                 <div style="text-align: right">?ポイント</div>');
                 var lists = new Ext.List({
                 xtype:'list',
                 store:storeFlat,
                 itemTpl:t,
                 disableSelection:true

                 });

                 var storeResult = new Ext.data.JsonStore({
                 model:'lists',
                 data:[
                 {title:'合計ポイント', result:'30'}
                 ],
                 autoload:true
                 });

                 var reslultList = new Ext.List({
                 xtype:'list',
                 itemTpl:'<div style="text-align: left;float: left">{title}</div>\
                 <div style="text-align: right;font-color:red;">{result}</div>',
                 store:storeResult,
                 disableSelection:true
                 });

                 // 合計ポイントだけ大きく出す
                 var totalPointPanel = new Ext.Panel({
                 type:'hbox',
                 align:'center',
                 items:[
                 {
                 html:"test"
                 }
                 ]
                 });
                 */
                // Panel生成
                var modal = new Ext.Panel({
                    // fullscreen表示しない
                    fullscreen:!!Ext.is.Phone,
                    // マスクする
                    modal:true,
                    // Panelをフローティング表示
                    floating:true,
                    // 幅
                    width:500,
                    // 高さ
                    height:500,
                    // Panelをセンター表示
                    centered:true,
                    layout:{
                        type:'vbox',
                        pack:'center'
                    },
                    items:[
                        {
                            styleHtmlContent:true,
                            html:'<div class="total-point">合計ポイント <span>' + totalPoints + '点</span></div>'

                        }
                    ]
                });
                modal.show();

            }
        });
        var btns = [this.navigationButton, {
            xtype:'spacer'
        }, this.confirmButton, {
            xtype:'spacer'
        }, this.settingButton];

        if (Ext.is.Phone) {
            btns.unshift(this.backButton);
        }
        this.navigationBar = new Ext.Toolbar({
            ui:'dark',
            dock:'top',
            title:this.title,
            items:btns.concat(this.buttons || [])
        });

        this.navigationPanel = new Ext.List({
            xtype:'list',
            store:store,
            itemTpl:'{title}',
            useToolbar:Ext.is.Phone ? false : true,
            updateTitleText:false,
            dock:'left',
            style:'border: 1px solid #99bbe8;',
            hidden:!Ext.is.Phone && Ext.Viewport.orientation == 'portrait',
            toolbar:Ext.is.Phone ? this.navigationBar : null,
            listeners:{
                scope:this,
                itemtap:function(thisView, rowIdx, itemEl) {
                    slideToItem(myPanel, rowIdx);
                }
            }
        });
        // CSSの追加
        function addCSS(context, css) {
            if (!context) {
                context = document;
            }
            if (context.createStyleSheet) { // for IE
                var sheet = context.createStyleSheet();
                sheet.cssText = css;
                return sheet;
            } else {
                if (!addCSS.style) {
                    addCSS.style = context.createElement('style');
                }
                addCSS.style.type = 'text/css';
                var _root = context.getElementsByTagName('head')[0] || context.documentElement;
                addCSS.style.textContent = css;
                return _root.appendChild(addCSS.style).sheet;
            }
        }

        // itemIdxへスライド。ループはしない
        function slideToItem(myPanel, rowIdx) {
            if (myPanel.items.length <= rowIdx || rowIdx < 0) {
                return;
            }
            var currentItemIdx = myPanel.items.indexOf(myPanel.getActiveItem());
            //console.log("before, ActiveItem is ", currentItemIdx);
            if (rowIdx > currentItemIdx) {
                myPanel.setActiveItem(rowIdx, { type:'slide', cover:false, direction:'up'});
            } else {
                myPanel.setActiveItem(rowIdx, { type:'slide', cover:false, direction:'down'});
            }
            //console.log("after   ActiveItem is ", rowIdx);
            myPanel.doComponentLayout();
        }


        if (!Ext.is.Phone) {
            this.navigationPanel.setWidth(250);
        }

        this.dockedItems = this.dockedItems || [];
        this.dockedItems.unshift(this.navigationBar);

        if (!Ext.is.Phone && Ext.Viewport.orientation == 'landscape') {
            this.dockedItems.unshift(this.navigationPanel);
        }

        this.addEvents('navigate');
        this.on("cardswitch", function(c, newCard, oldCard, idx, animated) {
            var conBt = Ext.getCmp('confirm-button');
            // Cardの末尾
            if (myPanel.items.length - 1 === idx) {
                conBt.setDisabled(false);
            } else {
                conBt.setDisabled(true);
            }
        });
        App.views.view.superclass.initComponent.call(this);
    },
    onNavButtonTap:function() {
        this.navigationPanel.showBy(this.navigationButton, 'fade');
    },
    layoutOrientation:function(orientation, w, h) {
        if (!Ext.is.Phone) {
            if (orientation == 'portrait') {
                this.navigationPanel.hide(false);
                this.removeDocked(this.navigationPanel, false);
                if (this.navigationPanel.rendered) {
                    this.navigationPanel.el.appendTo(document.body);
                }
                this.navigationPanel.setHeight(300);
                this.navigationPanel.setFloating(true);
                this.navigationButton.show(false);
            }
            else {
                this.navigationPanel.setFloating(false);
                this.navigationPanel.show(false);
                this.navigationButton.hide(false);
                this.insertDocked(0, this.navigationPanel);
            }
            this.navigationBar.doComponentLayout();
        }

        App.views.view.superclass.layoutOrientation.call(this, orientation, w, h);
    }
});
Ext.reg('App.views.view', App.views.view);
