Elkaisar.MenuList.menu = function (){
    
    var list =` 
                <div class="right-content">
                    <ul class="flex">
                        <li class="menu-list" data-show="trade">
                            <div class="image" style="background:url(images/icon-menu/1_a.png); background-size: 100% 100%;"></div>
                            <div class="text">
                                <h1>${Translate.Title.MenuList.Exchange[UserLag.language]}</h1>
                            </div>
                        </li>
                        <li  class="menu-list" data-show="reports">
                            <div class="image" style="background:url(images/icon-menu/2_a.png); background-size: 100% 100%;"></div>
                            <div class="notinf_green" id="hero-not-in-city"></div>
                            <div class="notinf_red" id="hero-attacking"></div>

                            <div class="text">
                                <h1>${Translate.Title.MenuList.Report[UserLag.language]}</h1>
                            </div>
                        </li>
                        <li  class="menu-list" data-show="quests">
                            <div class="image" style="background:url(images/icon-menu/3_a.png); background-size: 100% 100%;"></div>
                            <div class="notinf_green" id="Quests-ready-notif"></div>
                            <div class="notinf_red"></div>
                            <div class="text">
                                <h1>${Translate.Title.MenuList.Quest[UserLag.language]}</h1>
                            </div>
                        </li>
                        <li  class="menu-list" data-show="messages">
                            <div class="image " style="background:url(images/icon-menu/4_a.png); background-size: 100% 100%;"></div>
                            <div class="notinf_green" id="green-msg-notif"></div>
                            <div class="notinf_red" id="red-msg-notif"></div>
                            <div class="text">
                                <h1>${Translate.Title.MenuList.Mail[UserLag.language]}</h1>
                            </div>
                        </li>
                        <li  class="menu-list" data-show="union">
                            <div class="image" style="background:url(images/icon-menu/5_a.png); background-size: 100% 100%;"></div>
                            <div class="text">
                                <h1>${Translate.Title.MenuList.League[UserLag.language]}</h1>
                            </div>
                        </li>
                        <li  class="menu-list" data-show="ranks">
                            <div class="image" style="background:url(images/icon-menu/6_a.png); background-size: 100% 100%;" ></div>
                            <div class="text">
                                <h1>${Translate.Title.MenuList.Ranking[UserLag.language]}</h1>
                            </div>
                        </li>
                        <li  class="menu-list" data-show="matrial">
                            <div class="image" style="background:url(images/icon-menu/7_a.png); background-size: 100% 100%;"></div>
                            <div class="text">
                                <h1>${Translate.Title.MenuList.ItemMall[UserLag.language]}</h1>
                            </div>
                        </li>
                        <li  class="menu-list" data-show="dominant">
                            <div class="image" style="background:url(images/icon-menu/9_n.png); background-size: 100% 100%;"></div>
                            <div class="text">
                                <h1>${Translate.Title.MenuList.Dominance[UserLag.language]}</h1>
                            </div>
                        </li>
                        <li class="menu-list" data-show="buy-gold">
                            <a href="${Elkaisar.Config.PayLink}/?RechCode=${Elkaisar.Config.RechCode}&idServer=${Elkaisar.Config.idServer}" target="_blank">
                                <div class="image" style="background:url(images/icon-menu/8_a.png); background-size: 100% 100%;"></div>
                                <div class="text">
                                    <h1>${Translate.Title.MenuList.BuyGold[UserLag.language]}</h1>
                                </div>
                            </a>
                        </li>                                  
                    </ul>
                </div>`;
    
    $("#global-menu-list").html(list);
    
};


