'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sota6-si-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutComponent.html" data-type="entity-link" >AboutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DocsComponent.html" data-type="entity-link" >DocsComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AchievementsService.html" data-type="entity-link" >AchievementsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthProjService.html" data-type="entity-link" >AuthProjService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link" >ConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DpCategoriesService.html" data-type="entity-link" >DpCategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DpImagesService.html" data-type="entity-link" >DpImagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DpOrderCompositionsService.html" data-type="entity-link" >DpOrderCompositionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DpOrdersService.html" data-type="entity-link" >DpOrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DpProductAttributesService.html" data-type="entity-link" >DpProductAttributesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DpSizesService.html" data-type="entity-link" >DpSizesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DpUserProjsService.html" data-type="entity-link" >DpUserProjsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DpUsersService.html" data-type="entity-link" >DpUsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShopCartService.html" data-type="entity-link" >ShopCartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAchievementsService.html" data-type="entity-link" >UserAchievementsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CartItem.html" data-type="entity-link" >CartItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAchievement.html" data-type="entity-link" >IAchievement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddToCartRequest.html" data-type="entity-link" >IAddToCartRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICartItem.html" data-type="entity-link" >ICartItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICartViewModel.html" data-type="entity-link" >ICartViewModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateDpImageRequest.html" data-type="entity-link" >ICreateDpImageRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpCategory.html" data-type="entity-link" >IDpCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpImage.html" data-type="entity-link" >IDpImage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpOrder.html" data-type="entity-link" >IDpOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpOrderComposition.html" data-type="entity-link" >IDpOrderComposition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpOrderDetail.html" data-type="entity-link" >IDpOrderDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpProduct.html" data-type="entity-link" >IDpProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpProductAttribute.html" data-type="entity-link" >IDpProductAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpSize.html" data-type="entity-link" >IDpSize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpUser.html" data-type="entity-link" >IDpUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDpUserProj.html" data-type="entity-link" >IDpUserProj</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRemoveFromCartRequest.html" data-type="entity-link" >IRemoveFromCartRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateCartRequest.html" data-type="entity-link" >IUpdateCartRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateDpImageRequest.html" data-type="entity-link" >IUpdateDpImageRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserHasAchievement.html" data-type="entity-link" >IUserHasAchievement</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});