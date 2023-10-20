export const fakeMessages = [
  {
    'type': 'text',
    'text': '哈囉，你好嗎？',
    'disableInput': false
  },
  {
    'type': 'button',
    'text': '我能為您做什ㄇ?',
    'options': [
      {
        'text': '搜索文件',
        'value': 'search',
        'action': 'postback'
      },
      {
        'text': '提交文件',
        'value': 'submit_ticket',
        'action': 'postback'
      }
    ],
    'disableInput': true
  },
  {
    'type': 'text',
    'text': '請輸入您的提問',
    'disableInput': false
  },
  {
    'type': 'button',
    'text': '從知識庫萃取的內容如下.',
    'options': [
      {
        'text': '如何建立表單',
        'value': 'https://google.com',
        'action': 'url'
      },
      {
        'text': '如何建立次表單',
        'value': 'https://google.com',
        'action': 'url'
      },
      {
        'text': "這不是我要找的",
        'value': 'result_not_match',
        'action': 'postback'
      }
    ],
    'disableInput': true
  },
  {
    'type': 'text',
    'text': '很遺憾聽到這個消息。請輸入您的問題，我們將為您創建.',
    'disableInput': false
  },
  {
    'type': 'button',
    'text': '全做完了！',
    'options': [
      {
        'text': '確認一下',
        'value': 'https://google.com',
        'action': 'url'
      }
    ],
    'disableInput': false
  }
]
