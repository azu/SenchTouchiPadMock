/**
 * Created by azu.
 * Date: 11/10/20 12:43
 * License: MIT License
 */
App.views.detailView = Ext.extend(Ext.Panel, {
    id : "detailView",
    initComponent: function() {

        var form = {
            title : "あなたの年齢は?",
            instructions: "あなたの年齢に該当する項目をタップしてください",
            defaultType : "radiofield",
            items  : [
                {
                    name: 'size',
                    label: 'Just Me',
                    value: 'small'
                },
                {
                    name: 'size',
                    label: 'A few people',
                    value: 'medium'
                },
                {
                    name: 'size',
                    label: "What's my limit?",
                    value: 'large'
                }
            ]
        };

        Ext.apply(this, {
            fu: true,
            layout: 'card',
            cardAnimation: 'slide',
            items :[form]
        });

        App.views.view.superclass.initComponent.call(this);
    }
});
Ext.reg('App.views.detailView', App.views.detailView);
