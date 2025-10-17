<!DOCTYPE html>
<!--JETKode Main Website-->
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, initial-scale=1">
	<title>JETKode Mains</title>
	<link rel="stylesheet" href="style.css">
<style id="STYLE"></style>
</head>

<body>
	<JETKode id="CORE">
		<JETKode id="HEADER">
			<JETK-background id="HEADER-BACKGROUND">

			</JETK-background>
			<JETK-foreground id="HEADER-FOREGROUND">
				<JETK-head-logo id="logo">
					<img src="logo.png" id="logo-image" />
				</JETK-head-logo>
				<JETK-head-button url="home" id="HOME">HOME</JETK-head-button>
				<JETK-head-button url="lvm" id="INDGRPS">IND. GRPS.</JETK-head-button>
				<JETK-head-button url="about" id="ABOUT">ABOUT</JETK-head-button>
				<JETK-head-button url="quiz" id="QUIZ">QUIZ</JETK-head-button>
				<JETK-head-button id="SEARCH-BUTTON" is-icon="true">
					<!--by https://www.svgrepo.com/svg/7109/search -->
						<svg id="SEARCH-SVG" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" viewBox="0 0 500 500" width="500px" height="500px"><defs><bx:export><bx:file format="svg"/></bx:export></defs><ellipse style="stroke-width: 50px; stroke: rgb(255, 255, 255); fill: rgba(216, 216, 216, 0);" cx="216.319" cy="212.049" rx="174.573" ry="166.509"/><path style="fill: rgb(216, 216, 216); stroke: rgb(255,255,255); stroke-width: 50px;" d="M 319.734 344.402 L 433.587 472.486"/></svg>
					</JETK-head-button>
			</JETK-foreground>

			
		</JETKode>
		<JETKode-content id="CONTENT">
			
		</JETKode-content>
	</JETKode>
	
	<script src="app.js"></script>
</body>

</html>