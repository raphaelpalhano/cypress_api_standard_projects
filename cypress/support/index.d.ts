declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * @Description coloque o nome da tag que representa o ambiente que você estiver trabalhando
     * @param: (TagName)
     * @example: cy.changeBaseUrlIfNotEq('ServRest')
     * @Effect vai mudar a baseUrl para o outro ambiente conforme o que estiver no env do arquivo cypress.config.js
     */
    changeBaseUrl(envName: string): Chainable<any>;

    convertArrayBinaryToString(bodyBinary: any, mimeType: any): Chainable<any>;

    decodeJWT(encoded: string): Chainable<any>;

    getEntityId(): Chainable<any>;

    converterToJson(file: string): Chainable<any>;
    createInvoiceCsv(): Chainable<any>;

    /* -------------------------------------------------------BACK-END --------------------------------------------------------------------*/

    /**
     * @CommandGeneric
     * @requestWithoutBody
     * @method: get,delete,update
     * @param: (method,url)
     */
    requestWithoutBody(method: string, url: string): Chainable<any>;

    /**
     * @CommandGeneric
     * @requestWithBody
     * @method: post,delete,patch,update
     * @param: (method,url,body)
     * @example: cy.requestWithBody('POST', 'admin/user', body.json)
     */
    requestWithBody(method: string, url: string, body: object): Chainable<any>;

    /**
     * @CommandGeneric
     * @requestWithBody
     * @method: post,delete,patch,update
     * @param: (method,url,body,header)
     * @example: cy.requestWithBody('POST', 'admin/user', body.json, 'application/json')
     */
    requestWithBodyAndHeader(method: string, url: string, body: any, header: any): Chainable<any>;

    requestCognito(method: string, url: string, body: any, header: any): Chainable<any>;

    requestWithoutBodyButParam(method: string, endpoint: string, param: string): Chainable<any>;

    requestWithBodyAndParamAndHeader(method: string, endpoint: string, body: string, param: string, headers: any): Chainable<any>;

    authSap(userType: 'supplier' | 'investor' | 'manager'): Chainable<any>;
    authSystem(userType: 'supplier' | 'investor' | 'manager'): Chainable<any>;

    /**
     *
     * @param method
     * @param endpoint
     * @param filePath
     * @param typeFile
     * @param mimeType
     * @param formObject \{key: enterprise, value: 21312}
     *
     * @example cy.requestFormData('POST', `operations/api/v1/${endpoint}`, filePath, 'file', 'text/csv', formObject);`
     */
    requestFormData(method: string, endpoint: string, filePath: string, typeFile: string, mimeType: string, formObject: any): Chainable<any>;

    requestFormDataWithParam(method: string, endpoint: string, filePath: string, typeFile: string, mimeType: string, formObject: any): Chainable<any>;

    /**
     * @Description Gera as rotas utilizadas na automação
     */
    routerGenerator(): Chainable<any>;

    /**
     * @Description O comando cy.contractValidation() deve ser utilizado para validações de schemas.
     */
    schemaValidation(filePath, res: any): Chainable<any>;

    /* -----------------------------------------------------------------MICROSSERVICE -----------------------------------------------------*/

    getOperations(endpoint: string): Chainable<any>;

    getOneOperations(endpoint: string, params: string): Chainable<any>;

    postOperations(endpoint: string, body: object): Chainable<any>;

    deleteOperations(endpoint: string, id: string): Chainable<any>;

    patchOperations(endpoint: string, id: number, body: object): Chainable<any>;

    updateOperations(endpoint: string, id: string, body: object): Chainable<any>;

    uploadInvoices(endpoint: string, filePath: string, formObject: object): Chainable<any>;

    getSupplierInfo(endpoint: string, id: any): Chainable<any>;

    getListOfEnterprises(endpoint: string): Chainable<any>;

    postRetreveIdEnterprise(endpoint: string, body: Array<string>): Chainable<any>;

    getBffSpecific(endpoint: string, param: string): Chainable<any>;

    getBffgeneral(endpoint: string): Chainable<any>;

    getIntegrations(endpoint: string): Chainable<any>;

    getSpecificIntegration(endpoint: string, id: string): Chainable<any>;

    updateSpecificIntegration(endpoint: string, id: string, body: object): Chainable<any>;

    postIntegration(endpoint: string, body: object): Chainable<any>;

    deleteIntegration(endpoint: string, id: string): Chainable<any>;

    submitOrder(endpoint: string, orderId: string, body: object): Chainable<any>;

    uploadFees(endpoint: string, filePath: string): Chainable<any>;

    getInvestors(endpoint: string): Chainable<any>;

    patchInvestors(endpoint: string, body: object): Chainable<any>;

    postInvestors(endpoint: string, body: object): Chainable<any>;

    getPermissionsUsers(endpoint: string): Chainable<any>;
  }
}
