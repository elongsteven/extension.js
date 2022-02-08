/**
 * Project: 字符合法处理
 * By: Elong 2021/08/24
 * Ver: 0.4
 */

function textDisposer(Rule, Text) {
  if (typeof(Rule) == 'object' && Rule.length > 0) {
    if (typeof(Text) == 'string') {
      Rule.forEach(function(rule) {
        Text = Text.replace(new RegExp(rule, 'ig'), '**')
      });
      return Text;
    } else if (typeof(Text) == 'object' && Text.length > 0) {
      var txtArr = Text;
      Text.forEach(function(Text, index) {
        Rule.forEach(function(rule) {
          Text = Text.replace(new RegExp(rule, 'ig'), '**')
        })
        txtArr[index] = Text;
      });
      return txtArr;
    } else if (typeof(Text) == 'object') {
      for (key in Text) {
        Rule.forEach(function(rule) {
          try {
            Text[key] = Text[key].replace(new RegExp(rule, 'ig'), '**')
          } catch (e) {}
        });
      }
      return Text;
    }
  } else if (typeof(Rule) == 'string') {
    Ruler = Rule.split(new RegExp(',|，', 'ig'))
    return disposer(Ruler, Text);
  }
}