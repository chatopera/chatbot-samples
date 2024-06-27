/**
 * GitHub Issues 相关
 */


intent issue_template
- ^handleOpenGithubIssue()
 
+ ${0.7}{以上开 Issue|我要开 Issue|以上创建工单|以上条建工单|建工单|以上条建 Issue|以上条创建工单|创建工单|创建 Issue|以上创建 Issue}
- ^initOpenGithubIssue()

+ __congtr_issue_created
- 小主, Issue 已经创建完成
- Issue 为您建立好了，及时补充更多信息吧
- 以为您创建 Issue，来补充信息吧

