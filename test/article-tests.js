var fs = require('fs');
var should = require('should');
var read = require('../src/readability');

var articleFixtures = __dirname + '/fixtures';


describe('Regression Tests', function() {
  var testCases = [
  {
    fixture: 'wikipedia',
    title: 'Readability',
    include: [
      '<b>Readability</b> is the ease with which a',
      'Writing for a class of readers other than one\'s own is very difficult.',
      'He also developed several new measures of cutoff scores.'
    ],
    notInclude: [
      'Donate to Wikipedia'
    ]
  },
  {
    fixture: 'mediashift',
    title: 'Columbia\'s Lede Program Aims to Go Beyond the Data Hype',
    include: [
      'This all began at Joe',
      'Big Data models and practices aren',
      'Data-driven journalism in larger contexts',
    ],
    notInclude: [
      'Self-Publishing Your Book: Where’s the Money',
      'About EducationShift',
    ],
  },
  {
    fixture: 'kayiprihtim',
    title: '"Çizgi Roman Uyarlamaları İnceleme Yarışması" Sonuçlandı',
    include: [
      'nice seneler diliyoruz',
      'roman sitelerinden',
    ],
    notInclude: ['Yorum', 'Kategoriler'],
  },
  {
    fixture: 'psychology-today',
    title: 'Do We Become Less Optimistic As We Grow Older?',
    include: [
      'It requires thinking about the future',
      'found that from early to late adulthood',
      'This discussion about age and optimism skirts',
    ],
    notInclude: [
      'You Might Also Like',
      'Most Popular',
    ],
  },
  {
    fixture: 'ux-milk',
    title: 'より良いCSSを書くための様々なCSS設計まとめ',
    include: [
      'CSSは誰でも簡単に自由に',
      'SMACSSでは、スタイル',
      'Scoped CSS自体は、CSS設',
      'どのCSS設',
    ],
    notInclude: [
      'Web制作の作業効率を格段にア',
      'ライフハック',
      '個人情報の取り扱いについて',
    ],
  },
  {
    fixture: 'itmedia_news118',
    title: 'SIMアダプターやピンを収納——MOBOの「Card Strage」、8月中旬発売',
    include: [
      'アーキサイトは、8月中旬に提案型',
      '本製品にはmicro SIMを標準SIM',
    ],
    notInclude: [
      'アーキサイトの提案型トラベルグッズブランド',
      '「ジムで勝てない」「トレードしたい」　ポケモンGOで改善してほしいこと',
      '財布にも入るカード型！SIMカード',
      '4枚のSIMカードをリモートで切り替え',
      '「ジムで勝ったことがない」が5割　ポケモンGOアンケート',
      'エンジニアライフ'
    ],
  },
  {
    fixture: 'impress_1013705',
    title: '【やじうまWatch】楽しみながらフィットネス？　トレーニングマシン型のゲームコントローラーがAPIを提供中',
    include: [
      '「ゲームをやっているうちに痩せた」',
      'Pokémon GOやIngress',
    ],
    notInclude: [
      '他のアプリと同時起動が可能',
      '楽しみ方が豊富で',
      'Google、雪男を操作して',
      'インプレスのビジネスWeb'
    ],
  },
  {
    fixture: 'cnet_35086964',
    title: 'ビットコインが急落--香港の取引所で6800万ドル相当が盗難',
    include: [
      'ハッカーが香港の仮想通貨取引所「Bitfinex」から',
      '今回の窃盗事件は、',
      'bitfinex.comはアクセス不能になり、メンテナンスページが表示される」'
    ],
    notInclude: [
      'ソフトバンクが「第2回 SoftBank Innovation Program」',
      '日本初のビットコイン積み立てサービス',
      '【事例】効率性を突き詰めたら、',
      'カシオ、180度の全天周映像',
      '年商100億ドル超が見えてきた'
    ],
  },
  {
    fixture: 'gigazine_20160804-gopro-5-leaked',
    title: '「GoPro HERO5」はタッチスクリーンLCD搭載か？操作ディスプレイと思われる映像がリーク',
    include: [
      '2015年内にも登場とうわさされながら、なかなか',
      'Your first peak of the GoPro HERO5 camera : gopro',
      'GoPro HERO5とおぼしきモデルの様子',
      'このムービーを公開したのは',
      'GoProがどのような製品を出してくるのか興味深いところです。'
    ],
    notInclude: [
      '「ポケモンGO」の伝説のポケモンやiOS版のバッテリー節約モード',
      'パーソナルコンピューターの父アラン・ケイが人工知能・Apple・IT企業について語る',
      'ドーピングすると起こる体の変化と副作用',
      // 'GoProがVR用小型360度カメラを開発中、ライブ配信も可能で2017年にも市場に登場か',  // TODO: remove related entry
      'GIGAZINEについて'
    ],
  },
  {
    fixture: 'markezine_24962',
    title: '2016年上半期サイト訪問者数ランキング、キュレーションメディアが大幅伸長【ヴァリューズ調査】',
    include: [
      'ネット行動分析サービスを提供するヴァリューズ',
      'PCトップ3は「Yahoo!JAPAN」「Amazon」「楽天市場」',
      '2016年上半期における流入上位1,000サイトについて',
      'PC利用ではキュレーションメディアが躍進',
      'その結果、前年比が最も高かったのは旅行情報のキュレーションメディア',
      'また、「食べログ」「ぐるなび」といった'
    ],
    notInclude: [
      '会員情報ログイン',
      // 'ポケモントレーナーの朝は早い', // TODO: remove related entry
      '関連リンク',
      'イベンターのための夏のフェス',
      '女子大生はInstagramがお好き',
      'ROIとROASの違いをきっちり',
      '「競合商品より優れていれば売れる」時代は終わりました',
      '目覚ましいスピードで破壊的な',
      '次世代広告配信の真打“DSP”とは',
      '会社概要'
    ],
  },
  {
    fixture: 'zdnet_35086889',
    title: '「クラウド無法地帯」を阻止せよ--IT部門主導のクラウド活用メリット',
    include: [
      'これまでの2回の連載では、日本における',
      'このような、いわば「クラウド無法地帯」とも言える状況は',
      '企業でのクラウド無法地帯の具体例とその問題点を見ていこう。'
    ],
    notInclude: [
      '今回提言するテーマと目的', // h2
      '企業活動の改善はDevOpsにあり',
      'なぜ、うまくいかないデータ駆動型経営',
      '今後のビジネスに不可欠な「ITサービスの迅速な提供」',
      'CTOが明かす胸のうち',
      '小売りや卸、製造業などさまざまな業種を横断して',
      'クラウド利用に向けた組織・役割の最適化',
      'IaaS選定・導入はビジネス戦略から検討すべき',
      'ハッピーキャリアの作り方',
      'セルフサービス×ガバナンス=マネージド・セルフサービスBI',
      'Fintechの正体',
      '楽天が音楽聴き放題サービス',
      'PCもモバイルデバイスも一元管理クラウド型',
      '星野リゾート、クラウド型PBXで',
      'あのハリウッド映画でも！最先端の３DCG'
    ],
  },
  {
    fixture: 'engadget_android-one',
    title: 'iPhoneとの両輪で主力に、Android Oneを発売するワイモバイルの狙いとは：週刊モバイル通信 石野純也',
    include: [
      'ワイモバイルが、日本初の「Android One」となるシャープ製スマホの「507SH」',
      'もともと、Android Oneは、グーグルが始めた新興国向けのプログラムでした。',
      '▼iPhoneと両輪でワイモバイルの主力にしていく予定',
      '▼役割が拡大しつつあるAndroid One',
      'この試みがうまくいくかどうかは、今後も期待して見守りたいと思います。'
    ],
    notInclude: [
      'ワイモバイルがAndroid Oneスマホを発売するワケ', // post-garally
      'オススメ: 自動運転で死亡のテスラオーナー',
      '郵便局で格安スマホ販売へ。',
      '元グーグル社員が立ち上げたFIVE',
      'Official: ジャガー、再生産する「XKSS」',
      '【最強！週末映画ガイド】破壊王エメリッヒ'
    ],
  }];
  var isOnly = function(testCase) {return testCase.only};
  var noSkip = function(testCase) {return !testCase.skip};
  var hasOnly = testCases.some(isOnly);
  if (hasOnly) {
    testCases = testCases.filter(isOnly);
  }
  testCases.filter(noSkip).forEach(function(testCase) {
    it('can extract ' + testCase.fixture + ' articles', function(done) {
      var html = fs.readFileSync(articleFixtures + '/' + testCase.fixture + '.html').toString();
      read(html, function(error, article) {
        if(error) {
          done(error)
        } else {
          article.title.should.equal(testCase.title);
          (testCase.include || []).forEach(function(content) {
            article.content.should.include(content);
          });
          (testCase.notInclude || []).forEach(function(content) {
            article.content.should.not.include(content);
          });
          done();
        }
      });
    }).timeout(4000);
  });
});
