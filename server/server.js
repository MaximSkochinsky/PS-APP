const fs = require('fs')
const express = require('express')
const psnAPI = require('psn-api')
const path = require('path')
const cors = require('cors')
const { title } = require('process')



const main = async () => {
    console.log('Started login...')
}


main().then(async () => {

    const npsso = 'XMOGyvV4MoSgFTwx1Dex5OBrFk23NsmbkdoscIUD6IYuEF9VlfNwXIRv2WIQKQH8';

    const accessCode = await psnAPI.exchangeNpssoForCode(npsso);
    const authorization = await psnAPI.exchangeCodeForAccessToken(accessCode);


    const now = new Date();
    const expirationDate = new Date(
      now.getTime() + authorization.expiresIn * 1000
    ).toISOString();


    setInterval(async () => {
      const isAccessTokenExpired = new Date(expirationDate).getTime() < now.getTime();
    
      console.log('asdasd')
        if (isAccessTokenExpired) {
              const updatedAuthorization = await exchangeRefreshTokenForAuthTokens(
              authorization.refreshToken
        );
      }
    }, 1000 * 60)


    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))



    app.get('/api/profile', async (req, res) => {
        const searchResponse = await psnAPI.makeUniversalSearch(
          authorization,
          req.query.player,
          "SocialAllAccounts"
        );

        const foundAccountId =
        searchResponse.domainResponses[0].results[0].socialMetadata.accountId;
        
        console.log(foundAccountId)
        
        try {
          const userFriendsAccountIds = await psnAPI.getUserFriendsAccountIds(
            authorization,
            foundAccountId
          );

          console.log(userFriendsAccountIds.friends)

          let friendsList = []
          for (let friend of userFriendsAccountIds.friends) {
            const friendProfileInfo = await psnAPI.getProfileFromAccountId(
              authorization,
              friend
            );
            
              friendsList.push(friendProfileInfo)
          }

          res.send(friendsList)
        }
        catch(e) {
          console.log(e.message)
          res.send({})
        }
        

    })



    app.post('/api/trophy', async (req, res) => {
        // const accountId = allAccountsSearchResults.domainResponses[0].results[0].socialMetadata.accountId
           
          const data = req.body
          const trophiesResult = await psnAPI.getUserTrophiesEarnedForTitle(authorization,data.accountId, data.titleId, 'all', { npServiceName: "trophy" })
          
          const arrayOfPlayerTrophies = trophiesResult.trophies

          const titleTrophiesResult = await psnAPI.getTitleTrophies(authorization, data.titleId, "all", {
            npServiceName: "trophy"
          });

          const arrayOfTitleTrophies = titleTrophiesResult.trophies


          for (let playerTrophy of arrayOfPlayerTrophies) {
            for (let titleTrophy of arrayOfTitleTrophies) {
              if (titleTrophy.trophyId === playerTrophy.trophyId) {
                  playerTrophy['trophyName'] = titleTrophy['trophyName']
                  playerTrophy['trophyDetail'] = titleTrophy['trophyDetail']
                  playerTrophy['trophyIconUrl'] = titleTrophy['trophyIconUrl']
              }
            }
          }

          console.log(arrayOfPlayerTrophies)

          res.send(arrayOfPlayerTrophies)
    })
    
    
    app.post('/api/title', async (req, res) => {
          const accountNickName = req.body.nick
          const allAccountsSearchResults = await psnAPI.makeUniversalSearch(
              authorization,
              accountNickName,
              "SocialAllAccounts"
          );

          if (allAccountsSearchResults.domainResponses[0].results) {
            const imageSrc = allAccountsSearchResults.domainResponses[0]?.results[0]?.socialMetadata?.avatarUrl
            const accountId = allAccountsSearchResults.domainResponses[0]?.results[0]?.socialMetadata?.accountId
            const titles = await psnAPI.getUserTitles(authorization, accountId);
            let trophiesList = []
            if (titles.trophyTitles) {
              for (let title of titles.trophyTitles) {
                trophiesList.push({
                    titleName: title.trophyTitleName,
                    npCommunicationId: title.npCommunicationId,
                    definedTrophies: title.definedTrophies,
                    earnedTrophies: title.earnedTrophies,
                    trophyTitlePlatform: title.trophyTitlePlatform,
                    trophyIconUrl: title.trophyTitleIconUrl 
                })
              }
            }
            

            res.send({imageSrc: imageSrc, accountId: accountId, trophiesList: trophiesList})
          }
          
    })
    
    app.listen(process.env.PORT, () => {
        console.log('The application is listening on port 5000!');
    })

    
})


    

  // 2. Get the user's `accountId` from the username.
    // const allAccountsSearchResults = await psnAPI.makeUniversalSearch(
    //   authorization,
    //   "Mardleynar",
    //   "SocialAllAccounts"
    // );

 

    // const response = await psnAPI.getProfileFromUserName(authorization, "Mardleynar");

    // console.log(response.profile.avatarUrls)


    // const titles = await psnAPI.getUserTitles(authorization, "7029502517998033385");
    // console.log(titles)


    
 


  // console.log(response)
      // for (title of titles.trophyTitles) {
      //   const trophies = await psnAPI.getTitleTrophies(authorization, title.npCommunicationId, 'all', {
      //     npServiceName:
      //       title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined
      //   })

      //   console.log(trophies)
      // }
   


