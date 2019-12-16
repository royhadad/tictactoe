let contents = {};

contents.home = {header: null, body: null};
contents.home.header = "one of the most interesting towns in the world.";
contents.home.body = "Take a moment to explore Taos and discover the beauty, the culture, the people that make Taos and Northern New Mexico the Land of Enchantment.Seated on the high-desert mesa at the foot of the Sangre de Cristo Mountains, Taos is rich with art and steeped in history. Home to Taos Pueblo, the Village of Taos Ski Valley and a colorful array of surrounding communities, Taos County has something for everyone. Step into the history of Taos, New Mexico - this storied land has seen amazing people and events. The Enchanted Circle is an 86 mile drive through gorgeous mountain peaks and valleys. This Enchanted Circle links the towns of Taos, Questa, Red River, Eagle Nest, Angel Fire and back to Taos! Take a picnic lunch to enjoy the beauty and serenity of Bobcat Pass or while fishing at one of the lakes around Eagle Nest or Angel Fire. You could spend a month exploring Taos and never see the same thing twice.";
contents.home.sideBar = `<h2><b>Restaurants</b></h2>
<h3>Doc Martin's Restaurant</h3>
<a href="taosinn.com">docmartinsrestaurant.com</a>
<p>575-758-1977<br>1508 Paseo del Pueblo Sur, (in the Sagebrush Inn), Taos, NM 87571</p>
<h3>Los Vaqueros Steak House</h3>
<a href="https://www.sagebrushinn.com/">sagebrushinn.com</a>
<p>575-758-2254<br>located at The Taos Inn, 125 Paseo del Pueblo Norte, Taos, NM 87571</p>
<h3>Mosaic Fine Dining</h3>
<a href="https://www.thebalancesmb.com/what-is-fine-dining-2888688">finedining.com</a>
<p>575-751-3438<br>470 State Highway 150, PO Box 505, Arroyo Seco, NM 87514</p>
<h3>Mosaic Fine Dining</h3>
<a href="http://sabrosotaos.com/">sabrosotaos.com</a>
<p>575-776-3333<br>470 State Highway 150, PO Box 505, Arroyo Seco, NM 87514</p>`;


contents.hiking = {header: null, body: null};
contents.hiking.header = "You won't find more hiking diversity anywhere.";
contents.hiking.body = "Within an hour of Taos are more than fifty hiking trails in the mountains and foothills, along the canyon of the Rio Grande, and through the desert. View online maps (trails.com) and trail ratings, and stop by the Carson National Forest Office and Rio Grande Visitor Center to get oriented. By all means, ask the experienced folks at Taos Mountain Outfitters on the Plaza and Mudd N Flood on Bent Street for recommendations and advice. In Taos Ski Valley it's the people at Northside. Locals know! While you're there, ask the folks at Mudd N Flood for rock climbing spots and safety precautions. The Pilar area offers bouldering all year. Mountain Skills New Mexico rock climbing guides and instructors are available in Taos.";
contents.hiking.sideBar = `<h2><b>Hikes</b></h2>
<h3>Yerba Canyon and Manzanita Canyon</h3>
<p>EASY TO MODERATE<br>This is a great loop trail up through lush alpine scenery to Lobo Peak.</p>
<h3>Williams Lake and Wheeler Peak</h3>
<p>MODERATE to STRENUOUS<br>A gorgeous hike in the Wheeler Peak Wilderness Area! Even though there is elevation gain up to the lake, the trail is relatively easy.</p>
<h3>Columbine-Hondo Wilderness Study Area</h3>
<p>MODERATE TO STRENUOUS<br>Located between the Latir Peak and Wheeler Peak Wildernesses, the Columbine–Hondo Wilderness Study Area offers an extensive and well-developed system.</p>`;

contents.skiing = {header: null, body: null};
contents.skiing.header = "Not just the best in the Southwest. The best in the world.";
contents.skiing.body = "Come ski and ride the winter sun on the incredible slopes in the Land of Enchantment! Find out why skiers of all levels, from all over the world, make the trip to Taos every winter. Taos skiing will provide you with the ultimate in sporting options, stunning scenery, unbelievable food, out-of-this-world shopping, and a never-to-be-forgotten cultural experience. What you may not know about our skiing. On average, New Mexico slopes get 300 inches of snow each season. The new Kachina lift at Taos Ski Valley is one of the highest in North America. Angel Fire Ski & Summer Resort is the only New Mexico resort with night skiing. New Mexico's ski resorts are exceptionally family friendly, with affordable skiing and lodging packages to suit any budget.";
contents.skiing.sideBar = `<h2><b>Ski Areas</b></h2>
<h3>Taos Ski Valley</h3>
<p>The powder, sunshine and the steep terrain at Taos Ski Valley are legendary. But Taos offers plenty of beginner and intermediate trails as well. There’s something for everyone – skiing, telemarking, snowboarding and tubing, all in the laid back, European atmosphere that TSV has become famous for.</p>
<h3>Angel Fire Ski Resort</h3>
<p>Angel Fire Resort is a four-season alpine resort high in the Rocky Mountains of northern New Mexico. The resort is situated at 8,600-foot elevation with stunning views of Mt. Wheeler, the tallest peak in New Mexico.</p>
<h3>Red River Ski Area</h3>
<p>At Red River Ski Area the attitude is laid back, the people are friendly. With an average of 18 feet of snow each winter and 75-degree average temperatures in the summer, conditions are great!</p>`;

function changeContent(pageName)
{
    let content = contents[pageName];
    let textArea = document.querySelector("#mainTextArea");
    textArea.getElementsByTagName("h1")[0].innerHTML = content.header;
    textArea.getElementsByTagName("p")[0].innerHTML = content.body;
    document.getElementById("sideBar").innerHTML = content.sideBar;
}