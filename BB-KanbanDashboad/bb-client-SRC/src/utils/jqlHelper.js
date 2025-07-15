export const jql = {
    mm: `Project in (TMSPON) AND Type NOT in ("EPIC")
AND ((assignee in (e.subbiah, Anushree.Chandrasek, Soujanya.Shetty, sumitha.kumari, Sai.Suluru, praveer.nair, srinithi.ilangovan, vivekprabhakaran.j)) 
OR ( (issueFunction in commented("by e.subbiah") OR issuekey in updatedBy(e.subbiah) )
OR ( issueFunction in commented("by Anushree.Chandrasek") OR issuekey in updatedBy( Anushree.Chandrasek) )
OR ( issueFunction in commented("by Soujanya.Shetty") OR issuekey in updatedBy(Soujanya.Shetty) )
OR ( issueFunction in commented("by sumitha.kumari") OR issuekey in updatedBy(sumitha.kumari) )
OR ( issueFunction in commented("by Sai.Suluru") OR issuekey in updatedBy(Sai.Suluru) )
OR ( issueFunction in commented("by praveer.nair") OR issuekey in updatedBy(praveer.nair) )
OR ( issueFunction in commented("by srinithi.ilangovan") OR issuekey in updatedBy(srinithi.ilangovan) )
OR ( issueFunction in commented("by vivekprabhakaran.j") OR issuekey in updatedBy(vivekprabhakaran.j) ) ))` ,
    pp: `Project in (SCPA) AND Type NOT in ("EPIC")
AND ((assignee in (e.subbiah, Anushree.Chandrasek, Soujanya.Shetty, sumitha.kumari, Sai.Suluru, praveer.nair, srinithi.ilangovan, vivekprabhakaran.j)) 
OR ( (issueFunction in commented("by e.subbiah") OR issuekey in updatedBy(e.subbiah) )
OR ( issueFunction in commented("by Anushree.Chandrasek") OR issuekey in updatedBy( Anushree.Chandrasek) )
OR ( issueFunction in commented("by Soujanya.Shetty") OR issuekey in updatedBy(Soujanya.Shetty) )
OR ( issueFunction in commented("by sumitha.kumari") OR issuekey in updatedBy(sumitha.kumari) )
OR ( issueFunction in commented("by Sai.Suluru") OR issuekey in updatedBy(Sai.Suluru) )
OR ( issueFunction in commented("by praveer.nair") OR issuekey in updatedBy(praveer.nair) )
OR ( issueFunction in commented("by srinithi.ilangovan") OR issuekey in updatedBy(srinithi.ilangovan) )
OR ( issueFunction in commented("by vivekprabhakaran.j") OR issuekey in updatedBy(vivekprabhakaran.j) ) ))`
}
