// Application の定義
// Sencha Touch MVC に基づいた 5つの namespace が作られる
// i.e. App, App.models, App.views, App.controllers, App.stores
App = Ext.regApplication('App', {
    launch: function() {
        // launch がフレームワークによって呼ばれてしまう為、
        // PhoneGap API の初期化が完了していなかったら、一度初期化をキャンセルし、
        // deviceready イベントによって呼ばれるのを待つ
        // また、Chrome であれば、デバッグ用に PhoneGap API の状態に関わらず初期化を実行する
        if (typeof device === 'undefined' && !Ext.is.Desktop) return;
        console.log('launched');

        this.views.viewport = new this.views.Viewport();
    }
});

// PhoneGap API を利用する為、Sencha Touch で一般的な Ext.onReady, Ext.Application.launch でなく、
// PhoneGap API が初期化された後に呼ばれる deviceready イベントを初期化のトリガーとする。
document.addEventListener('deviceready', App.launch, true)