<template>
  <v-row>
    <v-col cols="12" md="2"></v-col>
    <v-col cols="12" md="8">
      <v-row>
        <v-col>
          <v-card outlined id="text-container">
            <v-row>
              <v-col class="d-none d-md-block" cols="12" md="2"></v-col>
              <v-col cols="12" md="8">
                <h3 id="p-title">{{title}}</h3>
              </v-col>
              <v-col class="d-none d-md-block" cols="12" md="2">
                  <v-img src="../assets/policy-dec.png"></v-img>
      
              </v-col>
            </v-row>
            <v-row v-for="item in texts" :key="item.index">
              <v-col id="texts-col" align='left'>{{item.text}}</v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-btn dark color="orange" to="/">Accept</v-btn>
    </v-col>
    <v-col md="2" cols="12"></v-col>
  </v-row>
</template>

<style scoped>
#text-col{
  text-align: left;
}
#text-container{
  padding: 1em;
}
#p-title{
  font-weight: 500;
}
</style>

<script>
export default {
  data() {
    return {
      title:'iContinu QR & Facial Recognition Privacy Notice',
      texts: [
        {
          text:
            "PLEASE READ THIS AGREEMENT CAREFULLY TO ENSURE THAT YOU UNDERSTAND EACH PROVISION. THIS AGREEMENT CONTAINS A MANDATORY INDIVIDUAL ARBITRATION AND CLASS ACTION/JURY TRIAL WAIVER PROVISION THAT REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS. If you do not accept this Agreement or any future versions of this Agreement, do not use or access (or continue to access) the Service."
        },
        {
          text:
            "You agree that we can collect Your Personal Information so that You can be verified and audited by relevant regulated bodies facilitated through iContinu QE & Facial Technology Service. Without this information, Your ID Documents cannot be validated and the iContinu QE & Facial Technology Service and any related services cannot be provided."
        },
        {
          text:
            "Information that are collected when You use the Website or the App. For example,"
        },
        {
          text:
            "1.	Personal Information such as Your name, address, and occupation from You when You use the iContinu QE & Facial Technology Service;"
        },
        {
          text:
            "2.	Information from an ID Document, Profession ID which You use to authenticate Your identity;"
        },
        {
          text:
            "3.	when You use the iContinu QE & Facial Technology Service to verify Your identity for an event, we collect information about this process."
        },
        {
          text:
            "If You use the App, the App Provider may also collect information about the Device that You use to access the App, such as physical location, operating system, settings and security protocols. iContinu QE & Facial Technology Service may use this information, and disclose it to assist in providing the iContinu QE & Facial Technology Service and enforcing these Terms of Use and the EULA."
        },
        {
          text:
            "You acknowledge that information about the ID Documents that You provide may be given to ID Verifiers such as the Australian government and other issuing authorities to confirm whether it matches information held by the authority or entity that issued the ID Document. You agree that the ID Verifiers can give us information about whether there is a match, and that we can use that match information in providing our identity checking services. If we offer checking of an ID Document issued overseas and You provide such an ID Document in connection with the iContinu QE & Facial Technology Service, You agree that information may be transferred internationally for the purpose of this identity checking process, and that we may use third party systems and services as we engage with government ID Verifiers."
        },
        {
          text:
            "We may hold some information about Professional ID as a result of the provision of our services. We may use this information to assist in checking information about Your identity."
        },
        {
          text:
            "Details checked in this way may be disclosed to participating Organisations who access the iContinu QE & Facial Technology Service with Your consent to authenticate Your identity. By registering a Profile, You agree that we may link some details of this information to Your Profile, which helps us keep Your registered information up-to-date."
        },
        {
          text:
            "We will disclose Your information to some other third party ID Verifiers (including APPRA and ASIC) to assist in the confirmation of attendance using iContinu QE & Facial Technology Service"
        },
        {
          text:
            "Where You have consented to have Your identity checked for an Organization, we provide to the Organization some Personal Information that has been checked, which may include Your name, address and date of birth, professional ID and whether a match has been confirmed by government ID Verifiers. We do not provide to the Organization copies of ID Documents, identification numbers used on ID Documents, or details of the authentication sources used to check Your identity, unless we have Your express consent. If we reasonably believe that any information provided to an Organization was or has become incorrect, misleading or out-of-date, we may inform the Organization and provide corrections or details of our concerns. You should check the privacy policy for each Organization before You agree for us to provide the Organization with information about Your identity."
        },
        {
          text:
            "Where we check an ID Document, we may retain Your Personal Information and details from the ID Document as well as details of the check we performed and the result of the check for audit and assurance purposes. We do not store images of ID Documents."
        },
        {
          text: "If You register a Profile:"
        },
        {
          text:
            "1.	we may store some information, including Your name, date of birth and address, and ID Document numbers, in an encrypted form and will only use or share them with Your express consent in connection with Your future use of iContinu QE & Facial Technology Service ;"
        },
        {
          text:
            "2.	we may also store other Personal Information, information about the types of ID Document You have checked with iContinu QE & Facial Technology, and information collected from ID Verifiers for Your future use of the iContinu QE & Facial Technology Service;"
        },
        {
          text:
            "3.	we may disclose information we have collected about You in connection with the iContinu QE & Facial Technology Service (including Personal Information) for the purposes of the iContinu QE & Facial Technology Service;"
        },
        {
          text:
            "4.	the iContinu QE & Facial Technology may collect and disclose to us information (including Personal Information) about You in order to facilitate the iContinu QE & Facial Technology Service;"
        },
        {
          text:
            "5.	some information may be stored on Your Device (for example, your name and photo are stored so these can be displayed in the App/ Website to personalize Your experience)."
        },
        {
          text:
            "Your information will be used to check Your identity for an Organization only with Your specific consent. You may give the consent to us through the iContinu QE & Facial Technology Service via the Website or the App. "
        },
        {
          text:
            "You hereby authorize us to disclose the information we hold about You and grant access to Your Profile to law enforcement and government authorities and agencies in accordance with their lawful requests."
        },
        {
          text:
            "We process and store Personal Information obtained as part of the iContinu QE & Facial Technology Service on our secure servers located in Microsoft Azure. Personal Information would only be likely to be processed outside Australia if you authorize a foreign Organization to access Your information for iContinu QE & Facial Technology Service purposes, or where you seek to authenticate Your identity using a foreign-issued ID Document that we accept."
        },
        {
          text:
            "Your Personal Information will be collected and handled securely, and only for the purpose of checking Your identity or facilitating that checking process and record Your attendance in events. "
        },
        {
          text:
            "PLEASE READ THIS AGREEMENT CAREFULLY TO ENSURE THAT YOU UNDERSTAND EACH PROVISION. THIS AGREEMENT CONTAINS A MANDATORY INDIVIDUAL ARBITRATION AND CLASS ACTION/JURY TRIAL WAIVER PROVISION THAT REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS. If you do not accept this Agreement or any future versions of this Agreement, do not use or access (or continue to access) the Service."
        },
        {
          text:
            "By accessing or using the Service, you signify that you have read, understood, and agree to be bound by this Terms of Use agreement (this “Agreement”) and to the collection and use of your information as set forth in the iContinue QR and Facial Recognition Privacy Policy, This Agreement applies to all visitors, users, and others who access the Service (“Users”).  If we enter into a separate contract with you regarding the Service, the terms of that contract shall govern in the event of any conflict with the terms of this Agreement."
        }
      ]
    };
  }
};
</script>

