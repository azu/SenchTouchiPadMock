App.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,

    initComponent: function() {
        Ext.apply(this, {
            items: [
                { xtype: 'App.views.view', id: 'view' },
            ]
        });
        App.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});
