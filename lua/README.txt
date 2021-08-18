			This is the advanced version of my previous text tool. It is recommended to make fonts with
			Kuut's text tool at kuut.xyz/fonttool
			
			You can alternatively use a program called Codehead's Bitmap Font Generator, but you have to
			define the kerning file manually.
			
			SpriteText comes with a default test font called Open Sans
			
			
!!!!!!!!!!!!!!!!!!!!!!!!!!!! DO NOT DELETE THIS FONT OR IT WILL CRASH !!!!!!!!!!!!!!!!!!!!!!!!!!!! 


			
			HOW TO USE SpriteText?
			
				1. Copy the folder named 'text' into your simfile's lua folder
				
				2. Load the xml in the foreground like you would load any other xml
				
				   - IF YOU USE MIRIN TEMPLATE: Name the xml with the Name= attribute
				     OTHERWISE: Assign a variable to your xml with Var= or variable_name_here=self
					 
					 
				   - Wrap the xml layer in an ActorFrame so you can move the text box around freely
				   
				   - If you want more text boxes, simply load the same xml over and over again and wrap each one in an ActorFrame
				   
				   
				3. Set up the text handler near the beginning of the file. You can do it in a func near beat 0
				
					- FIRST: add the children of the text box into a table with the following code
					  for example, if your text box is assigned with the name textbox[1] do the following:
					  myTable1=textbox[1]:GetChildren()
					  DO NOT SKIP THIS TEXT IF YOU WANT TO ACCESS INDIVIDUAL LETTERS
					
					- Then, set up the text box with the setup_texthandler function:
					  textbox[1] = setup_texthandler(textbox[1])
						
					- NOTICE: YOU CANNOT MOVE textbox[1] after this so it is important to wrap it in an ActorFrame
					
				4. Set the font
					
					- Generate a font with Kuut's font tool. Extract the zip file and move Font_Name 8x13.png 
					  AND Font_Name_kerning.lua to the text folder
					  
					- Load the graphic and the font file:
					  textbox[1]:setFont('Broadway_outline 8x13.png','Broadway_outline_kerning.lua')
					  This uses Load() so it may cause a lag spike when used. You can run it any time but the safest
					  time is to run it after the text box has been set up.
					  
				5. Make some text
					
					- FIRST: set a text box with setTextBox(spacing,height,xoffset,yoffset,wrap)
					
						
					  Parameters explained:
					  spacing between letters (optional, defaults to 0)
					  height of the rows (optional, defaults to 40)
					  x position of text (optional, defaults to -61)
					  y position of text (optional, defaults to -21)
					  row width in letters (optional, defaults to 18)
			
						  example: 
						  setTextBox(0,9,12,-100,50,30)
				
					- Then, use sayThis('string',speed,'filename.ogg')
					
					  Parameters explained:
					  String, aka the thing you want to say
					  Time it takes to spawn each letter
					  Sound for your text (optional)
				
						example:
						setTextBox(0,9,12) <-this ALWAYS comes first
						sayThis('Hello',0.06,'beep.ogg')
				
					  remember to ALWAYS run setTextBox before running sayThis or the
					  previous text won't be cleared.
				
				
				
				
				6. Extra functions
					colourText(s,e,r,g,b,a)
						This function colours a part of the text in the specified range between start and end values
						Parameters:
							 start
							 end
							 red
							 green
							 blue
							 alpha transparency
							 
							 
						example:
						textbox[1]:setTextBox(0,9,12)
						textbox[1]:colourText(11,15,0,0,1,1) --the word 'blue' is in blue now
						textbox[1]:sayThis('Imagine a blue stop sign',0.06,'sans.ogg')
						  
					setTalkSpeeds(start,end,speed)
						This works similarly to colourText, except it changes the
						speed of the letters between the start and end values
						run this function AFTER sayThis or otherwise the speeds
						will be overridden
						
						example:
						 textbox[1]:setTextBox(0,9,12)
						 textbox[1]:colourText(11,15,0,0,1,1) 
						 textbox[1]:sayThis('Imagine a blue stop sign',0.06,'sans.ogg')
						 textbox[1]:setTalkSpeeds(11,15,0.4) --the word 'blue' appears slowly
						 
						 You can also set the talkspeed to 0 to make the word spawn immediately
						 
					setTalkSounds(start,end,filename)
						This works in the same logic but replaces the audio file in the given range
						
						example:
						 textbox[1]:setTextBox(0,9,12)
						 textbox[1]:colourText(11,15,0,0,1,1) 
						 textbox[1]:sayThis('Imagine a blue stop sign',0.06,'sans.ogg')
						 textbox[1]:setTalkSpeeds(11,15,0.4)
						 textbox[1]:setTalkSounds(16,24,'asriel.ogg') --the word 'stop sign' will be spawned with asriel.ogg instead of sans.ogg
						 
						ALWAYS REMEMBER TO RUN THESE FUNCTIONS AFTER sayThis OR ELSE THEY WILL BE OVERRIDDEN
					
					getKerning(string)
						Returns the total width of a given string (doesn't include extra spacing)
						very useful if you want to center the text and don't want to guess the values
						
						example:
						 local centerPoint = textbox[1]:getKerning('Imagine a blue stop sign')/2 --save the width of the text to a variable and divide it by two
						
						 textbox[1]:setTextBox(0,9,12,centerPoint,0,24) --use the variable to center your text
						 textbox[1]:colourText(11,15,0,0,1,1) 
						 textbox[1]:sayThis('Imagine a blue stop sign',0.06,'sans.ogg')
						 textbox[1]:setTalkSpeeds(11,15,0.4)
						 textbox[1]:setTalkSounds(16,24,'asriel.ogg')
				
				7. More info
					
				
					- Each letter in SpriteText is contained in an ActorFrame, which gives you more overall control of the characters.
					  As mentioned before, it's wise to save the children of the text handler into a table before setting up the text handler
					    myTable1[3]:zoom(2) would set the zoom the 3rd letter of the string to 2
						
					  To access the graphic inside each letter actor, use GetChildAt(0)
						 myTable1[3]:GetChildAt(0):rainbow()
						 Now the third letter would cycle in the colours of rainbow
					
					- Word wrap isn't supported because I haven't been able to figure it out
					
					- Newline isn't supported yet for similar reasons but shouldn't be nearly as hard to implement
					
					- The current workaround to have rows of different amounts of length or push a sentence to the correct place by
					  running the letters through a for loop and using addx on each one of them
					  
					- If anyone wants to implement any of these things, I can add them to the main release later on and you will be credited
					  accordingly if you want so
					  
					  
				8. Credits and shoutouts
				
					Puuro	-	Programming, implementation, testing, design
					Kuut	-	Programming the FontTool, general help with implementation
					
					Shoutouts:
					
					XeroOl	-	HUGE thanks for guiding me through setting the metatable process and general help
					Kuut	-	EQUALLY HUQE thanks for making the online text tool. Making fonts is way less tedious this way