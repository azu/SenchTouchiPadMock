
App.models.User = Ext.regModel('User', {
    fields:[
        {
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
        },
        {
            title : "一日にタバコを吸う本数",
            instructions: "一日にタバコを吸う本数(禁煙中ならば、以前は何本くらいすっていましたか?)" +
                    "今まで、合計で何年間くらいタバコを吸っていましたか?"
            ,
            items: [
                {
                    xtype: "textfield",
                    label: "一日の喫煙本数",
                    name: "cigarettesPerDay"
                },
                {
                    xtype: "textfield",
                    label: "喫煙年数",
                    name: "yearsOfSmoking"
                }
            ]
        },
        {
            title : "あなたの体重・身長は?",
            instructions: "あなたの体重と身長を入力してください",
            items: [
                {
                    xtype: "textfield",
                    label: "体重",
                    name: "bodyWeight",
                    placeHolder: "体重を入力(数値のみ)"
                },
                {
                    xtype: "textfield",
                    label: "身長",
                    name: "bodyHeight",
                    placeHolder: "身長を入力(数値のみ)"
                }
            ]
        },
        {
            title : "チェックシート?",
            instructions: "それぞれの項目に対して該当するものをチェックしてください",
            items : [
                // それぞれの問題
                {
                    title : "天候により、せきがひどくなることがありますか？",
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
                },
                {
                    title : "あなたの年齢は?",
                    instructions: "あなたの年齢に該当する項目をタップしてください",
                    defaultType : "radiofield",
                    items  : [
                        {
                            name: 'hoge',
                            label: 'Just Me',
                            value: 'small'
                        },
                        {
                            name: 'hoge',
                            label: 'A few people',
                            value: 'medium'
                        },
                        {
                            name: 'hoge',
                            label: "What's my limit?",
                            value: 'large'
                        }
                    ]
                }
            ]
        }
    ]
});
